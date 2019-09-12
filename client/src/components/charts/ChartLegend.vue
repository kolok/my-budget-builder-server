<template>
<div style="display:flex;flex-direction:row;justify-content:center;align-items:center;">
  <svg height="20" width="20" class="dot">
    <circle cx="10" cy="10" r="7" stroke="#4A5889" stroke-width="4" fill="white" />
    <span class="dot--blue"></span>
  </svg>
  <p>New-York</p>
  <svg height="20" width="20" class="dot">
    <circle cx="10" cy="10" r="7" stroke="#B53446" stroke-width="4" fill="white" />
    <span class="dot--red"></span>
  </svg><p>Los Angeles</p>
  <svg height="20" width="20" class="dot">
    <circle cx="10" cy="10" r="7" stroke="#FFC300" stroke-width="4" fill="white" />
    <span class="dot--yellow"></span>
  </svg><p>London</p>
  <svg height="20" width="20" class="dot">
    <circle cx="10" cy="10" r="7" stroke="#347F6E" stroke-width="4" fill="white" />
    <span class="dot--green"></span>
  </svg><p>Paris</p>
</div>
</template>

<script>
  export default {}
</script>

<style>
  .dot {
    margin-left:10px;
    margin-right:5px;
  }
  .dot--blue {
    background-color: #4A5889;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    display: inline-block;
  }
  .dot--red {
    background-color: #B53446;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    display: inline-block;
  }
  .dot--yellow {
    background-color: #FFC300;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    display: inline-block;
  }
  .dot--green {
    background-color: #347F6E;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    display: inline-block;
  }

</style>
