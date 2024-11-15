/* eslint-disable react/prop-types */
import { useState } from "react";
import { COLUMNS, INITIAL_TASKS } from "./data";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

/* Drag & Drop using dnd kit library */

const DragDrop = () => {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    //return if we are not over something that is droppable.
    if (!over) return;

    //this is what we are dragging around
    const taskId = active.id;

    //column that we will be dropping over
    const newStatus = over.id;

    //update the task state
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 max-sm:flex-col">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
};

export default DragDrop;

const Column = ({ column, tasks }) => {
  //connecting this Column component to the DnD Context )making the column droppable
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  //for large scale app, fetch the tasks in this component based on the column id.

  return (
    <div className="min-h-[400px] flex flex-col rounded-lg bg-neutral-100 p-4 max-w-[320px] w-full">
      <h2 className="mb-4 font-semibold text-neutral-400">{column.title}</h2>
      <div ref={setNodeRef} className="mt-4 flex flex-1 flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

const TaskCard = ({ task }) => {
  //making each card draggable
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg bg-neutral-50 p-4 shadow-sm hover:shadow-md text-sm outline outline-1 outline-black/10"
      style={style}
    >
      <h3 className="font-medium text-neutral-400">{task.title}</h3>
      <p className="mt-2 text-sm text-neutral-400">{task.description}</p>
    </div>
  );
};
