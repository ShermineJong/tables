import { Text } from '@mantine/core';

interface BoldTextRendererProps {
    value: string;
}

export const BoldTextRenderer = (props: BoldTextRendererProps) => {
    const { value } = props;
    return (
        <Text tt="uppercase" size="sm">
            {value}
        </Text>
    );
};
