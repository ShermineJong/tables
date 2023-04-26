import { Text, Tooltip } from '@mantine/core';

interface LongTextRendererProps {
    value: string;
}

export const LongTextRenderer = (props: LongTextRendererProps) => {
    const { value } = props;
    return (
        <Tooltip label={value} withinPortal>
            <Text lineClamp={1} size="sm">
                {value}
            </Text>
        </Tooltip>
    );
};
