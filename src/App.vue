<style lang="less" type="text/less">
    .chess-row{
        overflow:hidden;
    }
    .chessman{
        height:40px;
        width:40px;
        float:left;
        box-sizing:border-box;
        border:1px solid #fff;
        &.state-0{
            background:#eee;
        }
        &.state-1{
            background:#333;
        }
        &.state-2{
            background: #fff;
        }
        &.last{
            border-color:red;
        }
    }
    .history{
        list-style: none;
        li.current{
            list-style: initial;
        }
    }
</style>

<template>
    <div id="app">
        now: {{five.getNextStepPlayer().name}}
        <div v-for="row,i in five.board.getBoard()" class="chess-row">
            <div v-for="chessman,j in row">
                <div :class="{
                chessman:true,
                ['state-'+chessman.state]:true,
                last:isLast(i,j)
                }" @click="five.nextStepChoseHere(i,j)"></div>
            </div>
        </div>
        <button @click="five.historyGo(-2);">悔棋</button>
        <button @click="five.historyGo(2);">撤销悔棋</button>
        <h4>History</h4>
        <ul class="history">
            <li v-for="h,i in five.history" :class="{current:i===five.currentStep}">
                {{h}}
            </li>
        </ul>
    </div>
</template>

<script>
    import Five from './five/Five';
    var five = new Five();

    export default {
        name: 'app',
        data(){
            return {five}
        },
        methods:{
            isLast(i,j){
                var p = this.five.getLastChessmanPosition();
                return p && p.row===i && p.col ===j;
            }
        },
        mounted(){

        }
    }
</script>

