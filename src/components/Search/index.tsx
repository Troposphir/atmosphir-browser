import * as React from "react";
import { noop } from "lodash";

import "./styles.scss";


interface Props {
    query: string;
    queryChange: (query: string) => void;
    search?: () => void;
}


export class Search extends React.Component<Props> {
    render() {
        const { query, queryChange, search = noop } = this.props;

        return <form
            className="Search input-group"
            onSubmit={ev => {
                search();
                ev.preventDefault();
            }}
        >
            <input
                autoFocus={true}
                type="text"
                placeholder="Search Levels"
                value={query}
                onChange={ev => queryChange(ev.target.value)}
            />
            <input
                className="primary"
                type="submit"
                value="Search"
            />
        </form>;
    }
}
