<style lang="less" type="text/less">
    @r:20px;
    .chess-row{
        display:inline-block;
        overflow:hidden;
        @c:red;
        background-image:
            linear-gradient(0deg, @c 0px, @c 2px, transparent 2px, transparent 100%),
            linear-gradient(90deg, @c 0px, @c 2px, transparent 2px, transparent 100%)
    ;
        background-size: 40px 40px;
        background-position: @r @r, @r @r, @r @r, @r @r;
    }
    .chessman{
        height:40px;
        width:40px;
        float:left;
        box-sizing:border-box;
        border-radius:99px;
        border:1px solid #ccc;
        transform:scale(0.7);
        &.state-0{
            /*background:#eee;*/
            border:none;
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
    <div>
        now: {{five.getNextStepPlayer().name}} <br> winner:{{five.winner||'-------'}}
        <div></div>
        <div v-for="row,i in five.board.getBoard()" class="chess-row">
            <div v-for="chessman,j in row">
                <div :class="{
                chessman:true,
                ['state-'+chessman.state]:true,
                last:isLast(i,j)
                }" @click="five.nextStepChoseHere(i,j)"></div>
            </div>
        </div>
        <div></div>
        <button @click="five.historyGo(-2);">悔棋</button>
        <button @click="five.historyGo(2);">撤销悔棋</button>
        <button @click="five.init();">初始化</button>
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
    window.five = five;

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

