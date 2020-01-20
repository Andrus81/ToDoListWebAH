const Api ='http://127.0.0.1:3000/'; //Route from backend
new Vue({
    el:'#app',
    created:function(){
        this.GetListTasks(),
        this.GetListUser()
        
    },
    data:{
        inputTask:{
            name:'',
            description:''
        },
        listAllTask:[],
        listTask:[],
        listTaskOpen:[],
        listTaskProgress:[],
        listTaskCompleted:[],
        listTaskArchived:[],
        listUser:[]
    },
    methods:{
        
        GetListTasks: function(){
            axios.get(Api+"Task").then(response =>{
                const list=  response.data;
                this.listAllTask=list;
                this.listTask = list.filter(task=>task.state==='ListTasks');
                this.listTaskOpen = list.filter(task=>task.state==='Open');
                this.listTaskProgress = list.filter(task=>task.state==='In-Progress');
                this.listTaskCompleted = list.filter(task=>task.state==='Completed');
                this.listTaskArchived = list.filter(task=>task.state==='Archived');
            }); 
        },
        GetListUser: function(){
            axios.get(Api+"User").then(response =>{
                this.listUser=  response.data; 

            }); 
        },
        AddTask: function(){
            axios.post(Api+"Task",{name:this.inputTask.name,description:this.inputTask.description}).then(response =>{
                swal("Task", response.data, "success");
            }).catch(err=>{
                swal("Error creating task", err.response, "error");
            });  
            this.listTask.push({name:this.inputTask.name,description:this.inputTask.description});

        }

    }
   
});

/*   GetListUser: function(){
            axios.get(Api+"Task").then(response =>{
                this.listUser=  response.data; 

            }); 
        }
*/ 
