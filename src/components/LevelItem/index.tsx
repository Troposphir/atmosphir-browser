import * as React from "react";
import { StatelessComponent } from "react";
import { map, range } from "lodash";

import { BasicLevel } from "../../types/Level";
import { LevelBadge } from "../LevelBadge";

import "./styles.scss";


interface Props {
    onSelect?: () => void;
}


export const Quality: StatelessComponent<{value?: number}> = ({value}) => <span className="Quality">
    {map(
        range(0, value, 1),
        (_, i) => <span key={i}/>,
    )}
</span>;


export const Difficulty: StatelessComponent<{value?: number}> = ({value}) => {
    if (value == null || value <= 0 || value > 5) {
        return null;
    }

    if (value < 1) {
        return <span className="Difficulty very-easy">Very Easy</span>;
    } else if (value < 2) {
        return <span className="Difficulty easy">Easy</span>;
    } else if (value < 3) {
        return <span className="Difficulty intermediate">Intermediate</span>;
    } else if (value < 4) {
        return <span className="Difficulty advanced">Advanced</span>;
    }
    return <span className="Difficulty expert">Expert</span>;
};


export class LevelItem extends React.Component<BasicLevel & Props, {}> {
    render() {
        const { author, title, ratings: {difficulty, quality}, screenshotUrl, onSelect } = this.props;

        const handler = () => {
            if (onSelect != null) {
                onSelect();
            }
        };

        return <figure
            className="LevelItem"
            tabIndex={0}
            onClick={handler}
            onTouchEnd={handler}
            onKeyUp={ev => {
                if (ev.key === "Enter") {
                    handler();
                }
            }}
        >
            <div
                className="screenshot"
                style={{
                    backgroundImage: `url(${screenshotUrl})`,
                }}
            >
                <div className="badges">
                    <LevelBadge {...this.props}/>
                </div>
                <div className="ratings">
                    <Quality value={quality}/>
                    <Difficulty value={difficulty}/>
                </div>
            </div>
            <div className="info">
                <figcaption className="title">
                    {title}
                </figcaption>
                <aside className="author">
                    {author}
                </aside>
            </div>
        </figure>;
    }
}