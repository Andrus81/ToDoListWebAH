const Api ='http://127.0.0.1:3000/'; //Route from backend
new Vue({
    el:'#app',
    created:function(){
        this.GetListTasks()
        
    },
    data:{
        listTask:[],
        listTaskOpen:[],
        listTaskProgress:[],
        listTaskCompleted:[],
        listTaskArchived:[]
    },
    methods:{
        
        GetListTasks: function(){
            axios.get(Api+"Task").then(response =>{
                const list=  response.data;
                this.listTask = list.filter(task=>task.state==='ListTasks');
                this.listTaskOpen = list.filter(task=>task.state==='Open');
                this.listTaskProgress = list.filter(task=>task.state==='In-Progress');
                this.listTaskCompleted = list.filter(task=>task.state==='Completed');
                this.listTaskArchived = list.filter(task=>task.state==='Archived');


            }); 
        }

    }
   
});
