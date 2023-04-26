import { Text } from '@mantine/core';

interface DateRendererProps {
    value: Date;
}

export const DateRenderer = (props: DateRendererProps) => {
    const { value } = props;
    return <Text size="sm">{value && value.toLocaleDateString()}</Text>;
};
