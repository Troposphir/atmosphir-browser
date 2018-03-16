import * as React from "react";
import { ReactNode } from "react";
import { debounce } from "lodash";

import { BasicLevel } from "../../types/Level";
import { searchLevels } from "../../modules/atmo-server-connect";


interface Props {
    query: string;
    batchSize?: number;
    renderItem({level}: {level: BasicLevel}): ReactNode;
    onLoaded(success: boolean): void;
}


interface State {
    total: number;
    results: BasicLevel[];
    resultsForQuery?: string;
}


export class SearchResults extends React.Component<Props, State> {
    static defaultProps = {
        batchSize: 30,
    };

    constructor(props: Props) {
        super(props);

        this.state = {
            total: 0,
            results: [],
        };

        this._loadFirst = debounce(this._loadFirst, 300);
    }

    get _batchSize() {
        const { batchSize } = this.props;

        if (typeof batchSize === "number") {
            return batchSize;
        }

        return 20;
    }

    componentDidUpdate({query: oldQuery}: Props, state: State) {
        const { query } = this.props;

        if (oldQuery !== query) {
            this._loadFirst();
        }
    }

    render() {
        const { renderItem } = this.props;
        const { results } = this.state;

        return <>
            {results.map(item => renderItem({level: item}))}
        </>;
    }

    async loadMore(): Promise<void> {
        const { results } = this.state;

        if (!this.canLoadMore()) {
            return;
        }

        await this._load(results.length, this._batchSize);
    }

    canLoadMore(): boolean {
        const { results, total, resultsForQuery } = this.state;
        const { query } = this.props;

        return resultsForQuery === query
            && results.length < total;
    }

    private _loadFirst() {
        this.setState(
            {
                total: 0,
                results: [],
                resultsForQuery: this.props.query,
            },
            () => this._load(0, this._batchSize)
                .then(() => true)
                .catch(() => false)
                .then((result: boolean) => this.props.onLoaded(result))
        );
    }

    private async _load(start: number, length: number): Promise<void> {
        const { query } = this.props;
        const { results } = this.state;

        const { total, results: searchResults } = await searchLevels(query, start, length);

        await new Promise((resolve, reject) => {
           try {
               this.setState(
                   {
                       total,
                       results: [
                           ...results,
                           ...searchResults,
                       ],
                   },
                   () => resolve()
               );
           } catch (e) {
               reject(e);
           }
        });
    }
}
