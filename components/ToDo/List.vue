<template>
  <div class="fluid">
    <div class="create-box">
      <label>Task</label>
      <InputText v-model="taskDescription"></InputText>
      <div class="fluid grid">
        <label> Duration </label>
        <InputText v-model="durationTask"></InputText>
        <Dropdown
          v-model="selectedDescDuration"
          :options="descriptionDuration"
          optionLabel="name"
        ></Dropdown>
        <Button class="btn-create" @click="createTask()" label="Add New Task"></Button>
      </div>
    </div>
  </div>
  <div class="fluid filter">
    <Checkbox v-model="active" value="active" binary @click="filterActive()"> </Checkbox>
    <label> Active </label>
  </div>
  <div>
    <DataTable :value="taskList" tableStyle="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="task" header="Task Description">
        <template #body="slotProps">
          <div v-if="editable">
            <InputText
              v-model="slotProps.data.task"
              :value="slotProps.data.task"
            ></InputText>
          </div>
          <div v-else>
            <span>
              {{ slotProps.data.task }}
            </span>
          </div></template
        >
      </Column>
      <Column field="duration" header="Duration"> 
        <template #body="slotProps">
          <div v-if="editable">
            <InputText
              v-model="slotProps.data.duration"
              :value="slotProps.data.duration"
            ></InputText>
          </div>
          <div v-else>
            <span>
              {{ slotProps.data.duration }}
            </span>
          </div></template
        >
      </Column>
      <Column field="deletedAt" header="Deleted At"></Column>
      <Column header="Action">
        <template #body="slotProps">
          <div v-if="!editable" class="btn-action">
            <Button label="Edit" @click="editText(slotProps.data.id)"></Button>
            <Button
              label="Soft Delete"
              @click="deleteTask(slotProps.data.id, false)"
            
            ></Button>
            <Button
              label="Hard Delete"
              @click="deleteTask(slotProps.data.id, true)"
            ></Button>
          </div>
          <div v-else>
            <Button label="Update" @click="updateTask(slotProps.data)"></Button>
            <Button label="Cancel" @click="cancelEdit()"></Button>
          </div>
        </template>
      </Column>
      <template #empty> No data found. </template>
    </DataTable>
  </div>
</template>

<script setup>
const taskList = ref();
const taskDescription = ref();
const durationTask = ref();
const active = ref(false);
const editable = ref(false);
const taskDescriptionList = ref();
const descriptionDuration = ref([
  { name: "Seconds", code: "s" },
  { name: "Minute", code: "m" },
  { name: "Hour", code: "h" },
  { name: "Day", code: "d" },
  { name: "Week", code: "w" },
  { name: "Month", code: "m" },
  { name: "Year", code: "y" },
]);
const selectedDescDuration = ref();
onMounted(() => {
  loadData();
});
async function loadData() {
  try {
    const response = await $fetch(`/api/todos`);
    taskList.value = response;
  } catch (error) {
    console.error("Cannot Access Server");
  }
}
async function filterActive() {
  try {
    console.log(active.value)
    const response = await $fetch(`/api/todos?active=${!active.value}`);
    taskList.value = response;
  } catch (error) {
    console.error("Cannot Access Server");
  }
}
async function createTask() {
  // TODO : Implement Create Task to Backend
  try {
    const newData = {
    task: taskDescription.value,
    duration: durationTask.value + selectedDescDuration.value.code
  }
    const response = await $fetch(`/api/todos`, {
        method: 'POST',
        body: newData
    });
    taskList.value = response;
  } catch (error) {
    console.error("Cannot Access Server");
  }
}
async function editText() {
  editable.value = true;
}
async function cancelEdit() {
  editable.value = false;
  loadData()
}
async function updateTask(data) {
  // TODO : Implement Update Task to Backend
  console.log(data.task, "data pdate")
  try {
    const newData = {
    task: data.task,
    duration: data.duration
  }
    const response = await $fetch(`/api/todos/${data.id}`, {
        method: 'PATCH',
        body: newData
    });
    taskList.value = response;
  editable.value = false;

  } catch (error) {
    console.error("Cannot Access Server");
  }
}
async function deleteTask(id, hard) {
  // TODO : Implement Condition Hard Delete
  try {
    const response = await $fetch(`/api/todos/${id}?hard=${hard}`, {
      method: "DELETE",
      body: [],
    });
    taskList.value =  response;

  } catch (error) {
    console.error(error);
  }
}
</script>

<style>
.create-box {
  display: flex;
  align-items: center;
  margin: 24px 0;
}
label {
  margin: 0 12px;
}
.btn-create{
  margin-left: 24px;
}
.filter{
  margin: 24px 0;
}
.btn-action{
  display: flex;
  gap: 12px
}
</style>
