import * as React from "react";

import "./styles.scss";


interface Props {
    onDismiss(): void;
}


export class Modal extends React.Component<Props, {}> {
    private handleEscape: (ev: KeyboardEvent) => void;

    constructor(props: Props) {
        super(props);

        this.handleEscape = ev => {
            if (ev.key === "Escape") {
                this.props.onDismiss();
                ev.preventDefault();
            }
        };
    }

    componentDidMount() {
        document.addEventListener("keyup", this.handleEscape);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.handleEscape);
    }

    render() {
        const { onDismiss } = this.props;

        return <div
            className="Modal"
            onClick={ev => {
                onDismiss();
                ev.preventDefault();
            }}
        >
            <div className="wrapper">
                <div className="content" onClick={ev => ev.stopPropagation()}>
                    {this.props.children}
                </div>
            </div>
        </div>;
    }
}