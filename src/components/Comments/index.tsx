import * as React from "react";

import { Comment } from "../../types/User";
import { AuthoredContent } from "../AuthoredContent";
import { getComments } from "../../modules/atmo-server-connect";

import "./styles.scss";


interface Props {
    levelId: number;
}


interface State {
    comments: Comment[];
}


export class Comments extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            comments: [],
        };

        this.loadComments(props.levelId);
    }

    componentWillUpdate(nextProps: Props) {
        const { levelId } = this.props;

        if (levelId !== nextProps.levelId) {
            this.loadComments(nextProps.levelId);
        }
    }

    render() {
        const { comments } = this.state;
        return <>
            <h2>Comments</h2>
            {comments.map(({id, authorId, body, author}) => <AuthoredContent
                key={id}
                authorId={authorId}
                name={author}
            >
                {body}
            </AuthoredContent>)}
            {comments.length === 0 && <>
                No comments
            </>}
        </>;
    }

    private loadComments(levelId: number) {
        getComments(levelId)
            .then(comments => this.setState({
                comments,
            }));
    }
}
