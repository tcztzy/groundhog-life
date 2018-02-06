<template>
    <div>
        <img :src="getEmoji()" style="width: 40px;"/>
        <img/>
        <a href="#" @click="showInfo">(info)</a>
        <stat-display :stat="stats.happiness"/><stat-display :stat="stats.health"/>
    </div>
</template>
