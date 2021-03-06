import * as React from "react";

import "./styles.scss";


interface Props {
    loading: boolean;
    error: boolean;
}


export class Logo extends React.Component<Props, {}> {
    render() {
        const { loading, error } = this.props;

        let className = "Logo";

        if (loading) {
            className += " spinning";
        }
        if (error) {
            className += " error";
        }

        return <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 1024 1024"
            className={className}
        >
            <path
                id="gear"
                d={
                    "m431 77.2c-1.8 1.36-2.15 5.06-2.74 7.08l-5 17.7c-6.71 22.8-13.6 45.5-20.2 68.4-1.88 6.46-3.87" +
                    " 12.9-5.76 19.3-1.09 3.73-1.69 7.17-5.56 8.99-10 4.72-20.7 8.36-31 12.4-3.55 1.4-8.61 4.73-12.5" +
                    " 4.16-3.01-0.437-5.96-2.75-8.58-4.14-5.96-3.17-11.9-6.43-17.8-9.62-19.6-10.5-39.2-21.1-58.8-31.7" +
                    "-5.93-3.23-11.9-6.45-17.8-9.61-2.34-1.24-5.21-3.58-7.92-3.83-3.33-0.319-6.5 4.23-8.58 6.27l-20.5" +
                    " 20c-20.8 20.3-41.3 40.9-62.1 61.3l-19.1 18.7c-2.71 2.65-7.03 5.61-8.7 9.03-1.66 3.39 3.36 9.38" +
                    " 5.02 12.3 6.31 10.9 12.3 22 18.6 32.9 8.78 15.2 17.2 30.6 25.9 45.8l7.26 12.9c1.22 2.14 3.16" +
                    " 4.55 3.23 7.09 0.115 4.01-3.33 9.26-4.93 12.9-2.92 6.63-5.63 13.3-8.49 20-1.35 3.15-2.38" +
                    " 6.77-4.29 9.64-1.78 2.66-4.95 3.19-7.87 4-5.73 1.59-11.4 3.27-17.2 4.88l-70 19.7c-7.27" +
                    " 2.04-14.5 4.16-21.8 6.17-2.2 0.61-6.27 0.957-7.05 3.46-1.1 3.51-0.21 8.44-0.21 12.1v141c0" +
                    " 2.55-1.11 8.38 1.06 10.2 1.93 1.64 5.78 1.99 8.19 2.67l19.1 5.43c22 6.13 44 12.4 66 18.6l19.1" +
                    " 5.43c2.86 0.802 6.74 1.25 9.09 3.13 3.83 3.06 5.56 10.7 7.4 15.1 2.82 6.66 5.69 13.3 8.46 20" +
                    " 1.12 2.7 3.36 6.05 3.27 9.03-0.0726 2.54-2.01 4.96-3.23 7.09-2.57 4.5-5.09 9.03-7.63 13.5-9.32" +
                    " 16.6-19.1 32.9-28.1 49.7-5.37 10-11.2 19.8-16.8 29.7-1.53 2.71-5.86 7.75-4.29 11 1.67 3.41" +
                    " 5.99 6.38 8.7 9.03l19.1 18.7c20.8 20.3 41.3 40.9 62.1 61.3l20.5 20c2.09 2.04 5.25 6.58 8.58" +
                    " 6.27 2.72-0.264 5.58-2.59 7.92-3.84 5.96-3.17 11.9-6.38 17.8-9.61 19.5-10.6 39.1-21.2 58.8-31.7" +
                    " 5.95-3.19 11.9-6.45 17.8-9.62 2.62-1.39 5.58-3.71 8.58-4.15 3.94-0.567 8.99 2.77 12.5 4.17 10.1" +
                    " 3.99 20.4 7.83 30.4 12.1 4.55 1.96 5.15 5.62 6.41 9.92l6.33 21.3 18.3 61.9 5.37 18.1c0.856 2.93" +
                    " 1.33 6.85 2.98 9.47 1.59 2.52 6.89 1.5 9.48 1.5h148c3.04 0 8.17 0.961 10.9-0.387 2.92-1.43" +
                    " 3.7-9.03 4.52-11.9 3.39-11.6 6.68-23.2 10.1-34.8 4.93-16.7 9.96-33.5 14.6-50.3 1.37-4.96" +
                    " 2.8-9.9 4.25-14.8 0.718-2.44 1.13-5.58 2.82-7.6 2.65-3.17 9.03-4.58 12.8-6.07 10.1-3.97" +
                    " 20.5-9.5 31-12.3 3.25-0.864 5.86 0.98 8.58 2.49 5.03 2.77 10.1 5.46 15.2 8.16 21.4 11.4 42.7" +
                    " 23 64 34.6 6.59 3.59 13.2 7.06 19.8 10.7 2.57 1.42 5.66 3.89 8.58 2.04 3.69-2.35 6.79-6.36" +
                    " 9.9-9.4l18.5-18.1c20.4-19.9 40.4-40.1 60.7-60l21.1-20.6c2.09-2.04 6.74-5.13 6.42-8.38-0.271" +
                    "-2.65-2.65-5.46-3.93-7.74-3.24-5.82-6.54-11.6-9.84-17.4-10.9-19.1-21.7-38.2-32.5-57.4-3.62-6.45" +
                    "-7.26-12.9-10.9-19.3-1.83-3.2-3.98-5.92-2.6-9.67 3.45-9.41 8.11-18.5 12.1-27.7 1.78-4.06 3.24" +
                    "-10.2 6.48-13.3 1.82-1.77 4.63-2.2 7.01-2.87l13.9-3.97c16.9-4.76 34-9.29 50.8-14.4 12.5-3.8 " +
                    "25.1-7.12 37.6-10.6 2.96-0.831 11.3-1.83 12.8-4.7 1.38-2.7 0.396-7.71 0.396-10.7v-25.1-90.9" +
                    "-28.4c0-2.52 1.05-7.7-1.53-9.25-2.17-1.31-5.29-1.64-7.71-2.37-6.35-1.91-12.8-3.6-19.1-5.42-19.8" +
                    "-5.65-39.6-11.3-59.4-16.9-8.37-2.33-16.8-4.61-25.1-7.14-3.06-0.934-7.29-1.34-9.65-3.64-3.78-3.69" +
                    "-5.53-11.2-7.62-15.9l-8.21-18.7c-1.16-2.66-3.43-6.07-3.4-9.03 0.0264-2.74 2.28-5.44 3.58-7.74" +
                    " 3.39-6.03 6.77-12.1 10.2-18.1 11-19.3 21.8-38.7 32.8-58 3.31-5.79 6.6-11.6 9.84-17.4 1.27-2.29" +
                    " 3.66-5.09 3.93-7.74 0.324-3.25-4.33-6.35-6.42-8.38l-15-18c-22-21-43-42-64-63l-18-18c-2.52-2.47" +
                    "-5.33-6.33-8.58-7.86-2.64-1.24-5.72 1.21-7.92 2.42-6.57 3.62-13.2 7.09-19.8 10.7-21.1 11.5-42.2" +
                    " 23-63.4 34.2-5.3 2.81-10.6 5.61-15.8 8.51-2.42 1.34-4.99 3.2-7.92 2.66-3.62-0.676-7.16-2.75" +
                    "-10.6-4.09l-21.8-8.64c-3.64-1.43-9.63-2.78-12.2-5.82-1.69-2.01-2.1-5.15-2.82-7.59l-4.62-16.1c" +
                    "-5.63-19.3-11.2-38.7-16.9-58-2.65-9.02-5.2-18.1-7.82-27.1-0.779-2.68-1.34-8.52-3.69-10.3-1.74" +
                    "-1.32-5.37-0.663-7.44-0.663h-19.8-124-11.9c-1.48 0.0032-3.55-0.287-4.8 0.663z"
                }
                className="Logo-main"
            />
            <path
                fill="#00000099"
                d="m229 570 192 10 160 122 184-4-44 86-88 52-128 22-76-8-72-34-54-40-50-54-30-46-16-80 14-22z"
                fillRule="evenodd"
            />
            <path
                fill="#00000099"
                d={
                    "m217 538 4-114 48-64 60-64 74-38 70-8 72-12 86 20 80 42 32 30 22 44 32 54s18 46 20 56 4 42 4" +
                    " 58-8 76-10 88-30 68-30 68l-64 30-102-18s-94-32-104-40-48-36-56-42-74-58-82-58-72-8-72-8z"
                }
                fillRule="evenodd"
            />
            <path
                className="Logo-main"
                d="m361 521v-176h106v65.8h-82.8v110z"
            />
            <path
                fill="#fff"
                d={
                    "m514 214c-182 0-330 148-330 330s148 330 330 330 330-148 330-330-148-330-330-330zm0 47.2c78 0 149" +
                    " 31.6 200 82.6h-93.7l-70.8 94.4h227c13.3 32.8 20.6 68.6 20.6 106 0 42.1-9.2 82.1-25.7" +
                    " 118h-163l-70.8 94.4h164c-49.9 44-115 70.8-187 70.8-132" +
                    " 0-243-90.2-274-212h121l70.8-94.4h-200c11-146 133-260 281-260z"
                }
            />
            <path
                className="Logo-main"
                d="m432 521-70.8 94.4 177 142 70.8-94.4z"
            />
            <path
                className="Logo-main"
                d={
                    "m644 438v28h-11.8v22.4h11.8v28h-11.8v22.4h11.8v28h-11.8v22.4h11.8v28h-11.8v22.4h11.8v22.4h23.6v" +
                    "-22.4h47.2v22.4h23.6v-22.4h11.8v-22.4h-11.8v-28h11.8v-22.4h-11.8v-28h11.8v-22.4h-11.8v-28h11.8v" +
                    "-22.4h-11.8v-28h-23.6v28h-47.2v-28h-23.6zm23.6 50.4h47.2v28h-47.2v-28zm0 50.4h47.2v28h-47.2v" +
                    "-28zm0 50.4h47.2v28h-47.2v-28z"
                }
            />
        </svg>;
    }
}