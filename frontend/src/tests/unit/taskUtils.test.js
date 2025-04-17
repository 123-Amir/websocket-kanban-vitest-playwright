import { addTask } from '../../taskUtils';

test('adds task to todo column', () => {
  const initialTasks = { todo: [] };
  const result = addTask(initialTasks, { id: 1, title: 'Test' });
  expect(result.todo).toHaveLength(1);
});

