import * as superagent from "superagent";
import { BasicLevel } from "../types/Level";


const SERVER_ENDPOINT: URL = new URL(process.env.REACT_APP_SERVER_ENDPOINT || "");
const IMAGE_ENDPOINT: URL = new URL(process.env.REACT_APP_IMAGE_ENDPOINT || "");


export interface PaginatedResults<T> {
    total: number;
    results: T[];
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
): Promise<PaginatedResults<BasicLevel>> {
    const escapedQuery = JSON.stringify(query);
    const { body: { fres: response } } = await request("a_llsReq", {
        query: `(name:${escapedQuery} OR description:${escapedQuery} OR author:${escapedQuery})`,
        freq: {
            _t: "freq",
            start: start,
            blockSize: pageSize,
        },
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
                ratings: {
                    quality: parseFloat(item["rating"]),
                    difficulty: parseFloat(item["difficulty"]),
                },
                isLotd: item["is.lotd"] > 0,
                isXp: item["xp.reward"] > 0,
                screenshotUrl: screenshotUrl.toString(),
            });
        }),
    };
}