import * as React from "react";
import IntersectionObserver from "@researchgate/react-intersection-observer";
import { repeat } from "lodash";

import { LevelItem } from "../LevelItem";
import { Search } from "../Search";
import { SearchResults } from "../SearchResults";
import { Logo } from "../Logo";

import "./styles.scss";


const INFINITE_LOAD_MARGIN = "5%";


interface Props {}


interface State {
    query: string;
    status?: boolean;
}


class App extends React.Component<Props, State> {
    private container: HTMLElement | null;
    private resultsList: SearchResults | null;

    constructor(props: Props) {
        super(props);

        this.state = {
            query: "",
            status: true,
        };
    }

    render() {
        const { query, status } = this.state;

        if (
            status != null
            && this.container != null
            && this.resultsList != null
            && this.resultsList.canLoadMore()
        ) {
            this._loadUntilScreenFilled(this.container, this.resultsList);
        }

        return <div className="App">
            <nav>
                <Logo loading={status == null} error={status === false}/>
                <Search
                    query={query}
                    queryChange={q => this.setState({query: q})}
                />
            </nav>
            <div className="list" ref={ref => this.container = ref}>
                <SearchResults
                    ref={ref => this.resultsList = ref}
                    query={query}
                    renderItem={({level}) => <LevelItem key={level.id} {...level} />}
                    statusChange={newStatus => this.setState({status: newStatus})}
                />
            </div>
            <IntersectionObserver
                onChange={entry => this._intersectionChange(entry)}
                rootMargin={repeat(`${INFINITE_LOAD_MARGIN} `, 4)}
            >
                <span style={{height: "10px"}}/>
            </IntersectionObserver>
        </div>;
    }

    private async _loadUntilScreenFilled(
        container: HTMLElement,
        resultsList: SearchResults,
    ) {
        let bottom = 0;
        do {
            bottom = container.getBoundingClientRect().bottom;
            await resultsList.loadMore();
        } while (
            bottom < window.innerHeight
            && resultsList.canLoadMore()
        );
    }

    private _intersectionChange(entry: IntersectionObserverEntry) {
        if (this.resultsList == null) {
            return;
        }

        if (entry.intersectionRatio > 0) {
            this.resultsList.loadMore();
        }
    }
}


export default App;
