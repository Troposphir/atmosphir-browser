import * as superagent from "superagent";
import { FullLevel } from "../types/Level";
import { UserProfile, Comment } from "../types/User";
import { ScoreEntry } from "../types/Score";


const SERVER_ENDPOINT: URL = new URL(process.env.REACT_APP_SERVER_ENDPOINT || "");
const IMAGE_ENDPOINT: URL = new URL(process.env.REACT_APP_IMAGE_ENDPOINT || "");


export interface PaginatedResults<T> {
    total: number;
    results: T[];
}


function paginate(
    start: number,
    count: number,
) {
    return {
        freq: {
            _t: "freq",
            start,
            blockSize: count,
        },
    };
}


export async function request(type: string, params:  object) {
    const response = await superagent.post(SERVER_ENDPOINT.toString())
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send({
            json: JSON.stringify({
                _t: "mfmessage",
                header: {
                    _t: "mfheader",
                },
                body: {
                    ...params,
                    _t: type,
                },
            }),
        });

    return response.body;
}


export async function searchLevels(
    query: string,
    start: number,
    pageSize: number,
): Promise<PaginatedResults<FullLevel>> {
    const escapedQuery = JSON.stringify(query);
    const { body: { fres: response } } = await request("a_llsReq", {
        query: `(name:${escapedQuery} OR description:${escapedQuery} OR author:${escapedQuery})`,
        ...paginate(start, pageSize),
    });

    return {
        total: response.total,
        results: response.results.map((item: object) => {
            const screenshotUrl = new URL(IMAGE_ENDPOINT.toString());
            screenshotUrl.searchParams.append("id", item["screenshotId"]);
            screenshotUrl.searchParams.append("lid", item["id"]);

            return ({
                id: item["id"],
                title: item["name"],
                author: item["author"],
                authorId: item["ownerId"],
                ratings: {
                    quality: parseFloat(item["rating"]),
                    difficulty: parseFloat(item["difficulty"]),
                },
                isLotd: item["is.lotd"] > 0,
                isXp: item["xp.reward"] > 0,
                screenshotUrl: screenshotUrl.toString(),
                description: item["description"],
                editable: item["editable"],
                playCount: item["dc"],
            });
        }),
    };
}


export async function getProfile(userId: number): Promise<UserProfile> {
    const { body: { fres: { results } } } = await request("getProfilesReq", {
        uid: userId,
    });

    const { props: { avaid } } = results[0];

    const avatarUrl = new URL(IMAGE_ENDPOINT.toString());
    avatarUrl.pathname += "/avatars";
    avatarUrl.searchParams.append("id", avaid);
    avatarUrl.searchParams.append("uid", userId.toString());

    return {
        avatarUrl: avatarUrl.toString(),
    };
}


export async function getComments(levelId: number): Promise<Comment[]> {
    const { body: { fres: { results } } } = await request("getLevelCommentsReq", {
        levelId,
        // More than 100 comments is highly unlikely, winging
        // it until there is any reason to expand this range.
        ...paginate(0, 100),
    });

    const names = await Promise.all(results.map(async ({uid}: {uid: number}) => {
        const response = await request("getUserByIdReq", {uid});
        return response.body.user.username;
    }));

    return results.map(({id, uid, body}: {id: number, uid: number, body: string}, i: number) => ({
        id,
        authorId: uid,
        author: names[i],
        body,
    }));
}


export async function getLeaderboard(
    levelId: number,
    start: number,
    count: number,
): Promise<PaginatedResults<ScoreEntry>> {
    const { body } = await request("getLeaderboardReq", {
        cid: levelId,
        ...paginate(start, count),
    });

    if (!("fres" in body)) {
        return {
            total: 0,
            results: [],
        };
    }

    const { fres: { results, total } } = body;

    const names = await Promise.all(results.map(async ({uid}: {uid: number}) => {
        const response = await request("getUserByIdReq", {uid});
        return response.body.user.username;
    }));

    const scores = results.map(({uid, s1}: {uid: number, s1: number}, i: number) => ({
        ownerId: uid,
        owner: names[i],
        score: s1,
    }));

    return {
        total,
        results: scores,
    };
}