import { Text, FormControl, FormLabel, Switch } from '@chakra-ui/react';

interface TodoFilterSwitchProps {
  showDone: boolean;
  onToggle: () => void;
}

export const TodoFilterSwitch = ({
  showDone,
  onToggle,
}: TodoFilterSwitchProps) => (
  <FormControl
    data-testid="todo-filter-switch"
    display="flex"
    alignItems="center"
  >
    <FormLabel htmlFor="show-done-switch" mb={0} ml={2} mr={4}>
      <Text fontWeight="semibold">Not Completed</Text>
    </FormLabel>
    <Switch id="show-done-switch" isChecked={showDone} onChange={onToggle} />
    <FormLabel htmlFor="show-done-switch" mb={0} ml={4}>
      <Text fontWeight="semibold">Completed</Text>
    </FormLabel>
  </FormControl>
);
