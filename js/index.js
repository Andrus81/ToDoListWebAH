const Api ='http://127.0.0.1:3000/'; //Route from backend
new Vue({
    el:'#app',
    created:function(){
        this.GetListTasks(),
        this.GetListUser(),
        this.GetListState()
        //this.showInfo()
    },
    data:{
        inputTask:{
            name:'',
            description:''
        },
        nameTask:'', 
        descriptionTask:'',
        userIdTask:'',
        username:'',
        statename: '',
        inputUser:{
            name:'',
            description:'',
            selectUser:'',
            selectTask:''
        },
        inputState:{
            name:'',
            description:'',
            selectState:'',
            selectTask:''
        },
        listAllTask:[],
        listTask:[],
        listTaskOpen:[],
        listTaskProgress:[],
        listTaskCompleted:[],
        listTaskArchived:[],
        listUser:[],
        listState:[]
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
        GetListState: function(){
            axios.get(Api+"State").then(response =>{
                this.listState=  response.data; 

            });
        },
        AddTask: function(){
            axios.post(Api+"Task",{name:this.inputTask.name,description:this.inputTask.description}).then(response =>{
                swal("Task", response.data, "success");
            }).catch(err=>{
                swal("Error creating task", err.response, "error");
            });  
            this.listTask.push({name:this.inputTask.name,description:this.inputTask.description});

        },
        DeleteTask:function (id) {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this task!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {

            axios.delete(`${Api}Task/${id}`,).then(response => {
                this.removeTaskFromArray(id);    
              });
              });
            },
        removeTaskFromArray: function(id){
            for(let i = 0;i<this.listTask.length;i++){
                if(this.listTask[i]._id == id){
                    this.listTask.splice(i, 1);
                    return;
                }
            }

            for(let i = 0;i<this.listTaskOpen.length;i++){
                if(this.listTaskOpen[i]._id == id){
                    this.listTaskOpen.splice(i, 1);
                    return;
                }
            }

            for(let i = 0;i<this.listTaskProgress.length;i++){
                if(this.listTaskProgress[i]._id == id){
                    this.listTaskProgress.splice(i, 1);
                    return;
                }
            }
            for(let i = 0;i<this.listTaskCompleted.length;i++){
                if(this.listTaskCompleted[i]._id == id){
                    this.listTaskCompleted.splice(i, 1);
                    return;
                }
            }

            for(let i = 0;i<this.listTaskArchived.length;i++){
                if(this.listTaskArchived[i]._id == id){
                    this.listTaskArchived.splice(i, 1);
                    return;
                }
            }

            
        },
        AddUser: function(){
            axios.post(Api+"User",{name:this.inputUser.name,description:this.inputUser.description}).then(response =>{
                swal("User", response.data, "success");
            }).catch(err=>{
                swal("Error creating task", err.response, "error");
            });  
            this.listUser.push({name:this.inputUser.name,description:this.inputUser.description});

        },
        AssingUserTask: function(){           
            axios.put(Api+"Task/"+this.inputUser.selectTask,{userid:this.inputUser.selectUser}).then(response =>{
                swal("task", response.data, "success");
            }).catch(err=>{
                swal("Error assign task", err.response.data.Data[0], "error");
            });
        },
        AssingStateTask: function(){   

            axios.put(Api+"Task/"+this.inputState.selectTask,{state:this.inputState.selectState}).then(response =>{
                swal("task", response.data, "success");
            }).catch(err=>{
                swal("Error assign task", err.response.data.Data[0], "error");
            });
        },
      /*  showInfo: function(id){
            axios.get(Api+"Task/"+_id).then(response =>{
                this.nameTask=  response.data[0].name; 
                this.descriptionTask=  response.data[0].name; 
                this.userIdTask=  response.data[0].name; 
            }); 

            axios.get(Api+"User?id="+this.userIdTask).then(response =>{
                this.username=  response.data[0].name;                 
            }); 

        }*/


    }
   
});

