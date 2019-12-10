<template>
  <div class="dashboard-container">
    <div class="dashboard-graph">
      <p>graph</p>
    </div>
    <div class="dashboard-info">
      <p>info</p>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.dashboard-container {
  background: yellow;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly; 
  flex-wrap: wrap;
  border: 2px solid red;
}

.dashboard-graph {
  background: blue;
  height: 50px;
  border: 2px solid red;
}

.dashboard-info {
  background: black;
  height:100px;
  border: 2px solid red;
  
}
</style>