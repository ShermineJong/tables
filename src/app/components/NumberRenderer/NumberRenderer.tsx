import { Badge } from '@mantine/core';

interface NumberRendererProps {
    value: number;
}

export const NumberRenderer = (props: NumberRendererProps) => {
    const { value } = props;
    if (value < 5000) {
        return (
            <Badge color="grape" variant="filled">
                {value}
            </Badge>
        );
    }

    if (value < 75000) {
        return (
            <Badge color="violet" variant="filled">
                {value}
            </Badge>
        );
    }

    if (value) {
        return (
            <Badge color="pink" variant="filled">
                {value}
            </Badge>
        );
    }
    return null;
};
