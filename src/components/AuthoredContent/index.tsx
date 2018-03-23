import * as React from "react";
import { ReactNode } from "react";

import { getProfile } from "../../modules/atmo-server-connect";

import "./styles.scss";


interface Props {
    title?: string;
    authorId: number;
    name: string;
    flair?: ReactNode;
    showAvatar?: boolean;
}


interface State {
    avatarUrl?: string;
}


export class AuthoredContent extends React.Component<Props, State> {
    static defaultProps = {
        showAvatar: true,
    };

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    componentDidUpdate({authorId: prevAuthorId}: Props) {
        const { authorId } = this.props;
        if (authorId !== prevAuthorId) {
            this.setState({
                avatarUrl: undefined,
            });
        }
    }

    render() {
        const { title, authorId, flair, name, showAvatar, children } = this.props;
        const { avatarUrl } = this.state;

        if (avatarUrl == null) {
            getProfile(authorId)
                .then(({avatarUrl: newAvatarUrl}) => this.setState({
                    avatarUrl: newAvatarUrl,
                }));
        }

        return <div className="AuthoredContent">
            {showAvatar && <img
                src={avatarUrl}
                alt={`${name}'s avatar`}
            />}
            <div className="info">
                <div className="title">{title}</div>
                <span className="author">{name}</span> {flair}
            </div>
            <div className="content">
                {children}
            </div>
        </div>;
    }
}
