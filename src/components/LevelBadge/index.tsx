import * as React from "react";
import "./styles.scss";


interface Props {
    isLotd: boolean;
    isXp: boolean;
}


export class LevelBadge extends React.Component<Props, {}> {
    render() {
        const { isLotd, isXp } = this.props;

        let content = null;
        if (isLotd) {
            content = <span className="lotd" >
                LOTD
            </span>;
        } else if (isXp) {
            content = <span className="xp">
                XP
            </span>;
        }

        if (content === null)  {
            return null;
        }

        return <div className="LevelBadge">
            {content}
        </div>;
    }
}
