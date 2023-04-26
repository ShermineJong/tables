import {
    ActionIcon,
    Badge,
    Box,
    Button,
    Checkbox,
    Group,
    Menu,
    OptionalPortal,
    Popover,
    Select,
    Stack,
    Text,
    TextInput,
    useMantineTheme,
} from '@mantine/core';
import { IconGripVertical } from '@tabler/icons-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { ColumnDef } from 'utils/generateTestData';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

interface NumberRendererProps {
    selectedGroupingColumn: ColumnDef | undefined;
    setGrouping: Dispatch<string[]>;
    columns: ColumnDef[];
    columnVisibility: Record<string, boolean>;
    setColumnVisibility: Dispatch<SetStateAction<Record<string, boolean>>>;
    setColumnOrder: Dispatch<SetStateAction<string[]>>;
    setFilter?: Dispatch<SetStateAction<Record<string, string>>>;
}

export const TopPanel = (props: NumberRendererProps) => {
    const {
        setGrouping,
        selectedGroupingColumn,
        columns,
        columnVisibility,
        setColumnVisibility,
        setColumnOrder,
        setFilter,
    } = props;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [email, setEmail] = useState('');

    const checkColumnVisibility = (accessor: string) => {
        return (
            columnVisibility[accessor] === null ||
            columnVisibility[accessor] === undefined ||
            columnVisibility[accessor]
        );
    };

    const onChangeColumnVisibility = (accessor: string, checked: boolean) => {
        setColumnVisibility(prevColumnVisibility => ({
            ...prevColumnVisibility,
            [accessor]: checked,
        }));
    };

    const theme = useMantineTheme();

    return (
        <Group>
            <Popover>
                <Popover.Target>
                    <Badge>Column</Badge>
                </Popover.Target>
                <Popover.Dropdown>
                    <DragDropContext
                        onDragEnd={item => {
                            setColumnOrder(prevOrder => {
                                const newOrder = [...prevOrder];
                                const temp = newOrder[item.source.index];
                                newOrder.splice(item.source.index, 1);
                                newOrder.splice(
                                    item.destination.index,
                                    0,
                                    temp,
                                );
                                return newOrder;
                            });
                        }}
                    >
                        <Droppable droppableId="droppableForColumns">
                            {providedDroppableForGroups => (
                                <Stack
                                    ref={providedDroppableForGroups.innerRef}
                                >
                                    {columns.map((column, index) => (
                                        <Draggable
                                            draggableId={column.accessor}
                                            index={index}
                                            key={column.accessor}
                                        >
                                            {(
                                                providedDraggableForGroup,
                                                snapshot,
                                            ) => (
                                                <OptionalPortal
                                                    withinPortal={
                                                        snapshot.isDragging
                                                    }
                                                >
                                                    <Box
                                                        w="100%"
                                                        ref={
                                                            providedDraggableForGroup.innerRef
                                                        }
                                                        {...providedDraggableForGroup.draggableProps}
                                                    >
                                                        <Checkbox
                                                            key={
                                                                column.accessor
                                                            }
                                                            checked={checkColumnVisibility(
                                                                column.accessor,
                                                            )}
                                                            onChange={event =>
                                                                onChangeColumnVisibility(
                                                                    column.accessor,
                                                                    event
                                                                        .currentTarget
                                                                        .checked,
                                                                )
                                                            }
                                                            label={
                                                                <Group>
                                                                    <ActionIcon
                                                                        variant="transparent"
                                                                        size="sm"
                                                                        color="gray"
                                                                        {...providedDraggableForGroup.dragHandleProps}
                                                                    >
                                                                        <IconGripVertical />
                                                                    </ActionIcon>
                                                                    <Text>
                                                                        {
                                                                            column.label
                                                                        }
                                                                    </Text>
                                                                </Group>
                                                            }
                                                        />
                                                    </Box>
                                                </OptionalPortal>
                                            )}
                                        </Draggable>
                                    ))}
                                </Stack>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Popover.Dropdown>
            </Popover>
            <Menu>
                <Menu.Target>
                    <Badge>
                        Group by
                        {selectedGroupingColumn
                            ? `: ${selectedGroupingColumn.label}`
                            : ''}
                    </Badge>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Label>Group by</Menu.Label>
                    {columns.map(item => (
                        <Menu.Item
                            key={item.accessor}
                            onClick={() => {
                                setGrouping([item.accessor]);
                            }}
                        >
                            {item.label}
                        </Menu.Item>
                    ))}
                    <Menu.Item
                        onClick={() => {
                            setGrouping([]);
                        }}
                    >
                        No Group
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <TextInput
                label="First Name"
                size="xs"
                styles={{ root: { display: 'flex', gap: theme.spacing.xs } }}
                value={firstName}
                onChange={event => setFirstName(event.target.value)}
            />
            <TextInput
                label="Last Name"
                size="xs"
                styles={{ root: { display: 'flex', gap: theme.spacing.xs } }}
                value={lastName}
                onChange={event => setLastName(event.target.value)}
            />
            <TextInput
                label="Job Title"
                size="xs"
                styles={{ root: { display: 'flex', gap: theme.spacing.xs } }}
                value={jobTitle}
                onChange={event => setJobTitle(event.target.value)}
            />
            <Select
                data={['yahoo.com', 'hotmail.com', 'gmail.com']}
                size="xs"
                label="Email"
                styles={{ root: { display: 'flex', gap: theme.spacing.xs } }}
                value={email}
                onChange={value => setEmail(value)}
                clearable
            />
            <Button
                size="xs"
                onClick={() => {
                    setFilter &&
                        setFilter({ firstName, lastName, jobTitle, email });
                }}
            >
                Filter
            </Button>
        </Group>
    );
};
