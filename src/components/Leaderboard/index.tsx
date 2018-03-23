import * as React from "react";

import { ScoreEntry } from "../../types/Score";
import { AuthoredContent } from "../AuthoredContent";
import { getLeaderboard } from "../../modules/atmo-server-connect";

import "./styles.scss";


const PAGE_SIZE = 10;


interface Props {
    levelId: number;
}


interface State {
    scores: ScoreEntry[];
    loading: boolean;
    total: number;
    page: number;
}


export class Leaderboard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            scores: [],
            loading: false,
            total: 0,
            page: 0,
        };
    }

    componentDidMount() {
        this.loadScorePage(this.props.levelId, 0);
    }

    componentWillUpdate(nextProps: Props, nextState: State) {
        const { levelId } = this.props;
        const { page } = this.state;

        if (levelId !== nextProps.levelId) {
            this.loadScorePage(nextProps.levelId, 0);
        } else if (page !== nextState.page) {
            this.loadScorePage(levelId, nextState.page);
        }
    }

    render() {
        const { scores, page, total, loading } = this.state;
        const lastPage = Math.ceil(total / PAGE_SIZE);

        const content = scores.length === 0
            ? <div className="empty">
                No scores in record. Nobody beat this level!
            </div>
            : <div className="pagination">
                <button
                    className="pure-button pure-button-primary"
                    disabled={page === 0}
                    onClick={() => this.setState({
                        page: Math.max(0, page - 1),
                    })}
                >
                    &lt;
                </button>
                {`Showing page ${page + 1} of ${lastPage}`}
                <button
                    className="pure-button pure-button-primary"
                    disabled={page === lastPage - 1}
                    onClick={() => this.setState({
                        page: Math.min(lastPage - 1, page + 1),
                    })}
                >
                    &gt;
                </button>
            </div>;

        return <div className={loading ? "Leaderboard loading" : "Leaderboard"}>
            <h2>Leaderboard</h2>
            {content}
            {scores.map(({ownerId, owner, score}) => <AuthoredContent
                showAvatar={false}
                key={ownerId}
                authorId={ownerId}
                name={owner}
                flair={<span className="Leaderboard-score">{score}</span>}
            />)}
        </div>;
    }

    private loadScorePage(levelId: number, page: number) {
        const previousPage = this.state.page;

        this.setState({loading: true});

        getLeaderboard(levelId, page * PAGE_SIZE, PAGE_SIZE)
            .then(({results, total}) => this.setState({
                scores: results,
                total,
                loading: false,
            }))
            .catch(() => this.setState({
                loading: false,
                page: previousPage,
            }));
    }
}
