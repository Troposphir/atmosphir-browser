import * as React from "react";

import { FullLevel } from "../../types/Level";
import { Difficulty, Quality } from "../LevelItem";
import { AuthoredContent } from "../AuthoredContent";

import "./styles.scss";


export class LevelDetails extends React.Component<FullLevel, {}> {
    render() {
        const {
            screenshotUrl,
            title,
            ratings: { quality, difficulty },
            description,
            author, authorId,
        } = this.props;
        return <div className="LevelDetails">
            <img src={screenshotUrl} className="image"/>

            <div className="quality">
                Quality
                <Quality value={quality}/>
            </div>

            <div className="difficulty">
                Difficulty
                <Difficulty value={difficulty}/>
            </div>

            <div className="description">
                {description}
            </div>

            <div className="credit">
                <AuthoredContent
                    authorId={authorId}
                    name={author}
                    title={title}
                />
            </div>

            <button disabled={true} className="play pure-button green">
                Play Now!
            </button>
        </div>;
    }
}