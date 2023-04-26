import { List } from '@mantine/core';

interface DateRendererProps {
    value: string[];
}

export const ListRenderer = (props: DateRendererProps) => {
    const { value } = props;
    return (
        <List size="sm" spacing="xs">
            {value.map(item => (
                <List.Item>{item}</List.Item>
            ))}
        </List>
    );
};
