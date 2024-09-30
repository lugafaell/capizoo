(function(){"use strict";var e={27:function(e,a,t){var i=t(130),o=t(768);const l={id:"app"};function s(e,a,t,i,s,n){const r=(0,o.g2)("router-view");return(0,o.uX)(),(0,o.CE)("div",l,[(0,o.bF)(r)])}var n={name:"App"},r=t(241);const d=(0,r.A)(n,[["render",s]]);var c=d,u=t(387),m=t(232),p=t.p+"img/Sem título-Photoroom.155c345a.png";const h={class:"login-container"},v={class:"login-left"},b={class:"input-group"},f={class:"input-group"},k={class:"login-right"},g={class:"typing-animation"};function L(e,a,t,l,s,n){const r=(0,o.g2)("CustomAlert");return(0,o.uX)(),(0,o.CE)("div",h,[(0,o.Lk)("div",v,[a[6]||(a[6]=(0,o.Lk)("img",{src:p,alt:"Login Illustration"},null,-1)),(0,o.Lk)("form",{onSubmit:a[2]||(a[2]=(0,i.D$)((function(){return n.handleLogin&&n.handleLogin(...arguments)}),["prevent"]))},[(0,o.Lk)("div",b,[(0,o.bo)((0,o.Lk)("input",{type:"text",placeholder:"Username","onUpdate:modelValue":a[0]||(a[0]=e=>s.username=e)},null,512),[[i.Jo,s.username]])]),(0,o.Lk)("div",f,[(0,o.bo)((0,o.Lk)("input",{type:"password",placeholder:"Password","onUpdate:modelValue":a[1]||(a[1]=e=>s.password=e)},null,512),[[i.Jo,s.password]])]),a[4]||(a[4]=(0,o.Lk)("button",{type:"submit",class:"btn-signin"},"SIGN IN",-1)),a[5]||(a[5]=(0,o.Lk)("a",{href:"#",class:"forgot-password"},"Forgot your password?",-1))],32)]),(0,o.Lk)("div",k,[(0,o.Lk)("h1",g,(0,m.v_)(s.typingText),1),a[7]||(a[7]=(0,o.Lk)("p",null,"your animal organization and cataloging platform",-1))]),s.showAlert?((0,o.uX)(),(0,o.Wv)(r,{key:0,message:s.alertMessage,type:s.alertType,onClose:a[3]||(a[3]=e=>s.showAlert=!1)},null,8,["message","type"])):(0,o.Q3)("",!0)])}var y=t(373);function C(e,a,t,i,l,s){return l.visible?((0,o.uX)(),(0,o.CE)("div",{key:0,class:(0,m.C4)(["custom-alert",t.type])},[(0,o.Lk)("span",null,(0,m.v_)(t.message),1),(0,o.Lk)("button",{onClick:a[0]||(a[0]=function(){return s.closeAlert&&s.closeAlert(...arguments)})},"x")],2)):(0,o.Q3)("",!0)}var S={name:"CustomAlert",props:{message:{type:String,required:!0},type:{type:String,default:"info"},duration:{type:Number,default:3e3}},data(){return{visible:!0}},methods:{closeAlert(){this.visible=!1,this.$emit("close")}},mounted(){setTimeout(this.closeAlert,this.duration)}};const A=(0,r.A)(S,[["render",C],["__scopeId","data-v-2244d4be"]]);var w=A,D=t(704),R={name:"LoginView",components:{CustomAlert:w},mounted(){this.checkLogin(),this.typeWriter()},data(){return{username:"",password:"",typingText:"",fullText:"Welcome to Capizoo!",currentIndex:0,showAlert:!1,alertMessage:"",alertType:"success"}},methods:{async handleLogin(){try{const e=await y.A.post("http://localhost:3000/user/login",{username:this.username,password:this.password});console.log(e.data),"Login bem-sucedido!"===e.data.message?(D.A.set("userId",e.data.userId,{expires:7}),this.showAlert=!0,this.alertMessage="Login successful",this.alertType="success",setTimeout((()=>{this.$router.push("/Home")}),1500)):(this.showAlert=!0,this.alertMessage="Credenciais inválidas. Tente novamente.",this.alertType="error")}catch(e){console.error("Erro durante o login:",e),this.showAlert=!0,this.alertMessage="Ocorreu um Erro durante o Login. Tente Novamente mais tarde",this.alertType="error"}},typeWriter(){this.currentIndex<this.fullText.length&&(this.typingText+=this.fullText.charAt(this.currentIndex),this.currentIndex++,setTimeout(this.typeWriter,100))},checkLogin(){const e=D.A.get("userId");e&&this.$router.push("/Home")}}};const _=(0,r.A)(R,[["render",L],["__scopeId","data-v-bd109ece"]]);var E=_,x=t.p+"img/logo_capizoo.9f79d0ba.png";const U={class:"home-view"},T={key:0,class:"sidebar-closed-content"},F={key:1,class:"sidebar-content"},I={class:"sidebar-top"},N={class:"menu-list"},H={class:"user-info"},B={class:"user-avatar"},$={class:"avatar"},M={class:"header"},X={class:"search-container"},V={class:"records"};function W(e,a,t,l,s,n){const r=(0,o.g2)("RecordCard"),d=(0,o.g2)("AddRecordModal"),c=(0,o.g2)("UpdateRecordModal");return(0,o.uX)(),(0,o.CE)(o.FK,null,[(0,o.Lk)("div",U,[(0,o.Lk)("aside",{class:(0,m.C4)(["sidebar",{"sidebar-closed":s.isSidebarClosed}])},[(0,o.Lk)("div",{class:"sidebar-toggle",onClick:a[0]||(a[0]=function(){return n.toggleSidebar&&n.toggleSidebar(...arguments)})},[(0,o.Lk)("i",{class:(0,m.C4)(s.isSidebarClosed?"fas fa-chevron-right":"fas fa-chevron-left")},null,2)]),s.isSidebarClosed?((0,o.uX)(),(0,o.CE)("div",T,a[8]||(a[8]=[(0,o.Lk)("img",{src:x,alt:"Capizoo Logo",class:"site-logo-small"},null,-1)]))):((0,o.uX)(),(0,o.CE)("div",F,[(0,o.Lk)("div",I,[a[11]||(a[11]=(0,o.Lk)("div",{class:"site-title"},[(0,o.Lk)("img",{src:p,alt:"Capizoo Logo",class:"site-logo"})],-1)),(0,o.Lk)("button",{class:"add-record-button",onClick:a[1]||(a[1]=e=>s.showModal=!0)},a[9]||(a[9]=[(0,o.Lk)("i",{class:"fas fa-add"},null,-1),(0,o.eW)(" Add New Record ")])),(0,o.Lk)("ul",N,[(0,o.Lk)("li",{onClick:a[2]||(a[2]=e=>n.setFilter("all"))},"All Records"),(0,o.Lk)("li",{onClick:a[3]||(a[3]=e=>n.setFilter("today"))},"Today's Records"),a[10]||(a[10]=(0,o.Lk)("li",null,"All Registered Animals",-1))])]),(0,o.Lk)("div",H,[(0,o.Lk)("div",B,[(0,o.Lk)("div",$,(0,m.v_)(s.userInitials),1),(0,o.Lk)("p",null,"Welcome, "+(0,m.v_)(s.username),1)]),(0,o.Lk)("button",{class:"logout-button",onClick:a[4]||(a[4]=function(){return n.logout&&n.logout(...arguments)})},a[12]||(a[12]=[(0,o.Lk)("i",{class:"fas fa-sign-out-alt"},null,-1)]))])]))],2),(0,o.Lk)("div",{class:(0,m.C4)(["records-list",{"records-list-expanded":s.isSidebarClosed}])},[(0,o.Lk)("header",M,[(0,o.Lk)("div",X,[(0,o.bo)((0,o.Lk)("select",{"onUpdate:modelValue":a[5]||(a[5]=e=>s.searchField=e),class:"search-field-select"},a[13]||(a[13]=[(0,o.Fv)('<option disabled data-v-3b65cc3d>Selecione o Filtro</option><option value="animalName" data-v-3b65cc3d>Nome do Animal</option><option value="animalSpecies" data-v-3b65cc3d>Espécie do Animal</option><option value="animalAge" data-v-3b65cc3d>Idade do Animal</option><option value="animalWeight" data-v-3b65cc3d>Peso do Animal</option><option value="animalHealth" data-v-3b65cc3d>Saúde do Animal</option><option value="animalBehavior" data-v-3b65cc3d>Comportamento do Animal</option><option value="animalDiet" data-v-3b65cc3d>Dieta do Animal</option><option value="observations" data-v-3b65cc3d>Observações</option><option value="modificationDate" data-v-3b65cc3d>Data de Modificação</option>',10)]),512),[[i.u1,s.searchField]]),(0,o.bo)((0,o.Lk)("input",{"onUpdate:modelValue":a[6]||(a[6]=e=>s.searchQuery=e),class:"search-bar",type:"search",placeholder:"Pesquisar..."},null,512),[[i.Jo,s.searchQuery]])])]),(0,o.Lk)("div",V,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(n.filteredRecords,((e,a)=>((0,o.uX)(),(0,o.Wv)(r,{key:e.id,id:e.id,animalName:e.animalName,animalSpecies:e.animalSpecies,animalHabitat:e.animalHabitat,observations:e.observations,modificationDate:e.modificationDate,index:a,onDeleteRecords:n.removeRecord,onClick:a=>n.openUpdateRecordModal(e)},null,8,["id","animalName","animalSpecies","animalHabitat","observations","modificationDate","index","onDeleteRecords","onClick"])))),128))])],2)]),(0,o.bF)(d,{isVisible:s.showModal,onClose:a[7]||(a[7]=e=>s.showModal=!1),onAddRecord:n.addRecord},null,8,["isVisible","onAddRecord"]),(0,o.bF)(c,{isVisible:s.showUpdateModal,animal:s.selectedRecord,onClose:n.closeUpdateRecordModal,onUpdate:n.handleUpdate},null,8,["isVisible","animal","onClose","onUpdate"])],64)}const O={class:"tabs"},P={class:"tab-content"},j={class:"form-row"},J={class:"form-group"},Q={class:"form-group"},K={class:"form-row"},q={class:"form-group"},z={class:"form-group"},G={class:"tab-content"},Y={class:"form-row"},Z={class:"form-group"},ee={class:"form-group"},ae={class:"tab-content"},te={class:"form-row"},ie={class:"form-group"},oe={class:"form-group"},le={class:"tab-content"},se={class:"form-area"},ne={class:"form-area"},re={class:"custom-file-wrapper"},de={class:"file-name"},ce={class:"button-group"},ue={key:2,type:"submit",class:"submit-button"};function me(e,a,t,l,s,n){return t.isVisible?((0,o.uX)(),(0,o.CE)("div",{key:0,class:"modal-overlay",onClick:a[14]||(a[14]=function(){return n.closeModal&&n.closeModal(...arguments)})},[(0,o.Lk)("div",{class:"modal-content animate__animated animate__fadeInDown",onClick:a[13]||(a[13]=(0,i.D$)((()=>{}),["stop"]))},[a[27]||(a[27]=(0,o.Lk)("div",{class:"modal-header"},[(0,o.Lk)("h2",null,"New Record")],-1)),(0,o.Lk)("div",O,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(s.tabs,((e,a)=>((0,o.uX)(),(0,o.CE)("div",{key:e.value,class:(0,m.C4)(["tab-indicator",{active:s.currentStep===a}])},(0,m.v_)(e.label),3)))),128))]),(0,o.Lk)("form",{onSubmit:a[12]||(a[12]=(0,i.D$)((function(){return n.submitTask&&n.submitTask(...arguments)}),["prevent"]))},[(0,o.bo)((0,o.Lk)("div",P,[(0,o.Lk)("div",j,[(0,o.Lk)("div",J,[a[15]||(a[15]=(0,o.Lk)("label",{for:"animalName"},"Animal Name:",-1)),(0,o.bo)((0,o.Lk)("input",{type:"text",id:"animalName","onUpdate:modelValue":a[0]||(a[0]=e=>s.animalName=e),placeholder:"Type your animal name",required:""},null,512),[[i.Jo,s.animalName]])]),(0,o.Lk)("div",Q,[a[16]||(a[16]=(0,o.Lk)("label",{for:"animalSpecies"},"Animal Species:",-1)),(0,o.bo)((0,o.Lk)("input",{type:"text",id:"animalSpecies","onUpdate:modelValue":a[1]||(a[1]=e=>s.animalSpecies=e),placeholder:"Type your animal species",required:""},null,512),[[i.Jo,s.animalSpecies]])])]),(0,o.Lk)("div",K,[(0,o.Lk)("div",q,[a[17]||(a[17]=(0,o.Lk)("label",{for:"animalAge"},"Animal Age:",-1)),(0,o.bo)((0,o.Lk)("input",{type:"number",id:"animalAge","onUpdate:modelValue":a[2]||(a[2]=e=>s.animalAge=e),placeholder:"Type your animal age",required:""},null,512),[[i.Jo,s.animalAge]])]),(0,o.Lk)("div",z,[a[18]||(a[18]=(0,o.Lk)("label",{for:"animalWeight"},"Animal Weight:",-1)),(0,o.bo)((0,o.Lk)("input",{type:"number",id:"animalWeight","onUpdate:modelValue":a[3]||(a[3]=e=>s.animalWeight=e),placeholder:"Type your animal weight",required:""},null,512),[[i.Jo,s.animalWeight]])])])],512),[[i.aG,0===s.currentStep]]),(0,o.bo)((0,o.Lk)("div",G,[(0,o.Lk)("div",Y,[(0,o.Lk)("div",Z,[a[20]||(a[20]=(0,o.Lk)("label",{for:"animalHealth"},"Animal Health:",-1)),(0,o.bo)((0,o.Lk)("select",{"onUpdate:modelValue":a[4]||(a[4]=e=>s.selectedHealth=e),required:""},a[19]||(a[19]=[(0,o.Lk)("option",{value:"",disabled:""},"What is your animal Health?",-1),(0,o.Lk)("option",{value:"Saudável"},"Saudável",-1),(0,o.Lk)("option",{value:"Necessita Cuidados"},"Necessita Cuidados",-1)]),512),[[i.u1,s.selectedHealth]])]),(0,o.Lk)("div",ee,[a[21]||(a[21]=(0,o.Lk)("label",{for:"animalHabitat"},"Animal Habitat:",-1)),(0,o.bo)((0,o.Lk)("input",{type:"text",id:"animalHabitat","onUpdate:modelValue":a[5]||(a[5]=e=>s.animalHabitat=e),placeholder:"Type your animal habitat",required:""},null,512),[[i.Jo,s.animalHabitat]])])])],512),[[i.aG,1===s.currentStep]]),(0,o.bo)((0,o.Lk)("div",ae,[(0,o.Lk)("div",te,[(0,o.Lk)("div",ie,[a[22]||(a[22]=(0,o.Lk)("label",{for:"animalBehavior"},"Animal Behavior:",-1)),(0,o.bo)((0,o.Lk)("input",{type:"text",id:"animalBehavior","onUpdate:modelValue":a[6]||(a[6]=e=>s.animalBehavior=e),placeholder:"Type your animal behavior",required:""},null,512),[[i.Jo,s.animalBehavior]])]),(0,o.Lk)("div",oe,[a[23]||(a[23]=(0,o.Lk)("label",{for:"animalDiet"},"Animal Diet:",-1)),(0,o.bo)((0,o.Lk)("input",{type:"text",id:"animalDiet","onUpdate:modelValue":a[7]||(a[7]=e=>s.animalDiet=e),placeholder:"Type your animal´s diet",required:""},null,512),[[i.Jo,s.animalDiet]])])])],512),[[i.aG,2===s.currentStep]]),(0,o.bo)((0,o.Lk)("div",le,[(0,o.Lk)("div",se,[a[24]||(a[24]=(0,o.Lk)("label",{for:"observations"},"Observation:",-1)),(0,o.bo)((0,o.Lk)("textarea",{id:"observations","onUpdate:modelValue":a[8]||(a[8]=e=>s.observations=e),placeholder:"Type your animal's observation",required:""},null,512),[[i.Jo,s.observations]])]),(0,o.Lk)("div",ne,[a[25]||(a[25]=(0,o.Lk)("label",{for:"animalImages"},"Pictures",-1)),(0,o.Lk)("div",re,[(0,o.Lk)("input",{type:"file",id:"animalImages",class:"custom-file-input",multiple:"",onChange:a[9]||(a[9]=function(){return n.handleFileUpload&&n.handleFileUpload(...arguments)})},null,32),(0,o.Lk)("span",de,(0,m.v_)(s.selectedFileNames.length?s.selectedFileNames.join(", "):"Nenhum arquivo escolhido"),1)])])],512),[[i.aG,3===s.currentStep]]),(0,o.Lk)("div",ce,[s.currentStep>0?((0,o.uX)(),(0,o.CE)("button",{key:0,type:"button",class:"nav-button",onClick:a[10]||(a[10]=function(){return n.prevStep&&n.prevStep(...arguments)})}," Previous ")):(0,o.Q3)("",!0),s.currentStep<s.tabs.length-1?((0,o.uX)(),(0,o.CE)("button",{key:1,type:"button",class:"nav-button",onClick:a[11]||(a[11]=function(){return n.nextStep&&n.nextStep(...arguments)})}," Next ")):(0,o.Q3)("",!0),s.currentStep===s.tabs.length-1?((0,o.uX)(),(0,o.CE)("button",ue,a[26]||(a[26]=[(0,o.Lk)("i",{class:"fas fa-add"},null,-1),(0,o.eW)(" Add New Record ")]))):(0,o.Q3)("",!0)])],32)])])):(0,o.Q3)("",!0)}var pe={props:{isVisible:{type:Boolean,default:!1}},data(){return{currentStep:0,tabs:[{label:"Basic Info",value:"basic"},{label:"Health & Habitat",value:"health"},{label:"Behavior & Diet",value:"behavior"},{label:"Additional Info",value:"additional"}],animalName:"",animalSpecies:"",animalAge:"",animalWeight:"",selectedHealth:"",animalHabitat:"",animalBehavior:"",animalDiet:"",observations:"",animalPictures:[],selectedFileNames:[]}},watch:{isVisible(e){e&&this.resetForm()}},methods:{closeModal(){this.$emit("close")},nextStep(){this.currentStep<this.tabs.length-1&&this.currentStep++},prevStep(){this.currentStep>0&&this.currentStep--},getCurrentDateTime(){const e=new Date,a=String(e.getDate()).padStart(2,"0"),t=String(e.getMonth()+1).padStart(2,"0"),i=e.getFullYear(),o=String(e.getHours()).padStart(2,"0"),l=String(e.getMinutes()).padStart(2,"0"),s=String(e.getSeconds()).padStart(2,"0");return`${a}/${t}/${i} ${o}:${l}:${s}`},async handleFileUpload(e){const a=Array.from(e.target.files),t=new FormData;this.selectedFileNames=a.map((e=>e.name)),a.forEach((e=>{t.append("images",e)}));try{const e=await fetch("http://localhost:3000/upload/upload",{method:"POST",body:t});if(!e.ok)throw new Error("Erro ao enviar as imagens.");const a=await e.json();this.animalPictures=a.imageUrls.join(", ")}catch(i){console.error("Erro ao enviar as imagens:",i)}},async submitTask(){const e=D.A.get("userId"),a={animalName:this.animalName,animalSpecies:this.animalSpecies,animalAge:this.animalAge,animalWeight:this.animalWeight,animalHealth:this.selectedHealth,animalHabitat:this.animalHabitat,animalBehavior:this.animalBehavior,animalDiet:this.animalDiet,observations:this.observations,animalPictures:this.animalPictures,modificationDate:this.getCurrentDateTime(),userId:e};try{const e=await fetch("http://localhost:3000/records/registerRecords",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!e.ok){const a=await e.json();throw new Error(a.message||"Erro ao registrar.")}const t=await e.json();this.$emit("add-record",t),this.closeModal()}catch(t){console.error("Erro ao registrar:",t),alert("Erro ao registrar o animal. Por favor, tente novamente.")}},resetForm(){this.currentStep=0,this.animalName="",this.animalSpecies="",this.animalAge="",this.animalWeight="",this.selectedHealth="",this.animalHabitat="",this.animalBehavior="",this.animalDiet="",this.observations="",this.selectedFileNames=[]}}};const he=(0,r.A)(pe,[["render",me],["__scopeId","data-v-acd53c90"]]);var ve=he;const be={class:"record-header"},fe={class:"record-date"},ke={class:"record-footer"},ge={class:"record-actions"};function Le(e,a,t,l,s,n){return(0,o.uX)(),(0,o.CE)("div",{class:(0,m.C4)(["record-card animate__animated",{animate__fadeInUp:!s.isBeingRemoved,animate__fadeOutDown:s.isBeingRemoved}]),style:(0,m.Tr)({animationDelay:s.isBeingRemoved?"0s":.2*t.index+"s"}),onClick:a[1]||(a[1]=a=>e.$emit("click"))},[(0,o.Lk)("h3",null,(0,m.v_)(t.animalName),1),(0,o.Lk)("p",null,"Espécie: "+(0,m.v_)(t.animalSpecies),1),(0,o.Lk)("p",null,"Habitat: "+(0,m.v_)(t.animalHabitat),1),(0,o.Lk)("p",null,"Observações: "+(0,m.v_)(t.observations),1),(0,o.Lk)("div",be,[a[2]||(a[2]=(0,o.Lk)("i",{class:"fas fa-calendar-alt"},null,-1)),(0,o.Lk)("span",fe,(0,m.v_)(t.modificationDate),1)]),a[3]||(a[3]=(0,o.Lk)("hr",{class:"dashed-line"},null,-1)),(0,o.Lk)("div",ke,[(0,o.Lk)("div",ge,[(0,o.Lk)("i",{class:"fas fa-trash",onClick:a[0]||(a[0]=(0,i.D$)((function(){return n.handleDeleteRecords&&n.handleDeleteRecords(...arguments)}),["stop"]))})])])],6)}var ye={props:{id:Number,animalName:String,animalSpecies:String,animalHabitat:String,observations:String,modificationDate:String,index:Number},data(){return{isBeingRemoved:!1}},methods:{handleDeleteRecords(){this.isBeingRemoved=!0,setTimeout((()=>{this.$emit("delete-records",this.id)}),500)}}};const Ce=(0,r.A)(ye,[["render",Le],["__scopeId","data-v-f276f040"]]);var Se=Ce,Ae=t(144);const we={class:"modal-body"},De={class:"info-section"},Re={class:"label-container"},_e=["for"],Ee=["onClick","aria-label"],xe=["id","onUpdate:modelValue","type","onKeyup"],Ue=["onClick","aria-label"],Te={class:"form-group collapsible"},Fe={class:"collapsible-header"},Ie=["aria-expanded"],Ne={key:0},He=["value"],Be={class:"form-group collapsible"},$e={class:"collapsible-header"},Me=["aria-expanded"],Xe={key:0},Ve=["value"],We={class:"form-group collapsible"},Oe={class:"collapsible-header"},Pe=["aria-expanded"],je={key:0},Je=["value"],Qe={class:"image-carousel"},Ke={class:"carousel-container"},qe=["src"],ze={class:"image-counter"};var Ge={__name:"UpdateRecordModal",props:{isVisible:Boolean,animal:Object},emits:["close","update"],setup(e,a){let{emit:t}=a;const l=e,s=t,n=(0,Ae.KR)(0),r=(0,Ae.KR)(""),d=(0,Ae.Kh)({}),c=(0,Ae.Kh)({}),u=(0,Ae.Kh)({}),p=(0,o.EW)((()=>({animalName:l.animal.animalName,animalSpecies:l.animal.animalSpecies,animalAge:`${l.animal.animalAge} years`,animalWeight:`${l.animal.animalWeight} kg`,animalHealth:l.animal.animalHealth,animalHabitat:l.animal.animalHabitat}))),h=(0,o.EW)((()=>{let e=l.animal.animalPictures;return"string"===typeof e&&(e=e.split(",").map((e=>e.trim()))),Array.isArray(e)&&e.length>0&&e[n.value]||x})),v=(0,o.EW)((()=>{let e=l.animal.animalPictures;return"string"===typeof e&&(e=e.split(",").map((e=>e.trim()))),Array.isArray(e)?e.length:1})),b=()=>{s("close")},f=()=>{n.value>0&&(r.value="animate__slideInLeft",setTimeout((()=>{n.value--}),300))},k=()=>{n.value<v.value-1&&(r.value="animate__slideInRight",setTimeout((()=>{n.value++}),300))},g=e=>{d[e]=!d[e]},L=e=>d[e]||!1,y=e=>e.replace("animal","").replace(/([A-Z])/g," $1").trim(),C=e=>{c[e]?S(e):(c[e]=!0,u[e]=l.animal[e])},S=e=>{c[e]=!1,s("update",{id:l.animal.id,field:e,value:u[e]})},A=e=>c[e]||!1,w=e=>"animalAge"===e||"animalWeight"===e?"number":"text";return(a,t)=>e.isVisible?((0,o.uX)(),(0,o.CE)("div",{key:0,class:"modal-overlay",onClick:b},[(0,o.Lk)("div",{class:"modal-content animate__animated animate__fadeInDown",onClick:t[9]||(t[9]=(0,i.D$)((()=>{}),["stop"]))},[(0,o.Lk)("div",we,[(0,o.Lk)("div",De,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(p.value,((e,a)=>((0,o.uX)(),(0,o.CE)("div",{key:a,class:"form-group"},[(0,o.Lk)("div",Re,[(0,o.Lk)("label",{for:a},(0,m.v_)(y(a))+":",9,_e),A(a)?((0,o.uX)(),(0,o.CE)(o.FK,{key:1},[(0,o.bo)((0,o.Lk)("input",{id:a,"onUpdate:modelValue":e=>u[a]=e,type:w(a),class:"edit-input",onKeyup:(0,i.jR)((e=>S(a)),["enter"])},null,40,xe),[[i.hp,u[a]]]),(0,o.Lk)("button",{onClick:e=>S(a),class:"edit-button","aria-label":`Confirm ${y(a)} edit`},t[11]||(t[11]=[(0,o.Lk)("i",{class:"fas fa-check"},null,-1)]),8,Ue)],64)):((0,o.uX)(),(0,o.CE)(o.FK,{key:0},[(0,o.Lk)("span",null,(0,m.v_)(e),1),(0,o.Lk)("button",{onClick:e=>C(a),class:"edit-button","aria-label":`Edit ${y(a)}`},t[10]||(t[10]=[(0,o.Lk)("i",{class:"fas fa-edit"},null,-1)]),8,Ee)],64))])])))),128)),(0,o.Lk)("div",Te,[(0,o.Lk)("div",Fe,[t[12]||(t[12]=(0,o.Lk)("div",{class:"label-container"},[(0,o.Lk)("label",{for:"animalBehavior"},"Behavior:")],-1)),(0,o.Lk)("button",{class:"collapse-button",onClick:t[0]||(t[0]=e=>g("behavior")),"aria-expanded":L("behavior")},(0,m.v_)(L("behavior")?"-":"+"),9,Ie)]),(0,o.bF)(i.eB,{name:"fade"},{default:(0,o.k6)((()=>[L("behavior")?((0,o.uX)(),(0,o.CE)("div",Ne,[A("animalBehavior")?(0,o.bo)(((0,o.uX)(),(0,o.CE)("textarea",{key:0,id:"animalBehavior","onUpdate:modelValue":t[1]||(t[1]=e=>u.animalBehavior=e),class:"edit-textarea"},null,512)),[[i.Jo,u.animalBehavior]]):((0,o.uX)(),(0,o.CE)("textarea",{key:1,readonly:"",value:e.animal.animalBehavior},null,8,He)),(0,o.Lk)("button",{onClick:t[2]||(t[2]=e=>C("animalBehavior")),class:"edit-button","aria-label":"Edit Behavior"},[(0,o.Lk)("i",{class:(0,m.C4)(["fas",A("animalBehavior")?"fa-check":"fa-edit"])},null,2)])])):(0,o.Q3)("",!0)])),_:1})]),(0,o.Lk)("div",Be,[(0,o.Lk)("div",$e,[t[13]||(t[13]=(0,o.Lk)("div",{class:"label-container"},[(0,o.Lk)("label",{for:"animalDiet"},"Diet:")],-1)),(0,o.Lk)("button",{class:"collapse-button",onClick:t[3]||(t[3]=e=>g("diet")),"aria-expanded":L("diet")},(0,m.v_)(L("diet")?"-":"+"),9,Me)]),(0,o.bF)(i.eB,{name:"fade"},{default:(0,o.k6)((()=>[L("diet")?((0,o.uX)(),(0,o.CE)("div",Xe,[A("animalDiet")?(0,o.bo)(((0,o.uX)(),(0,o.CE)("textarea",{key:0,id:"animalDiet","onUpdate:modelValue":t[4]||(t[4]=e=>u.animalDiet=e),class:"edit-textarea"},null,512)),[[i.Jo,u.animalDiet]]):((0,o.uX)(),(0,o.CE)("textarea",{key:1,readonly:"",value:e.animal.animalDiet},null,8,Ve)),(0,o.Lk)("button",{onClick:t[5]||(t[5]=e=>C("animalDiet")),class:"edit-button","aria-label":"Edit Diet"},[(0,o.Lk)("i",{class:(0,m.C4)(["fas",A("animalDiet")?"fa-check":"fa-edit"])},null,2)])])):(0,o.Q3)("",!0)])),_:1})]),(0,o.Lk)("div",We,[(0,o.Lk)("div",Oe,[t[14]||(t[14]=(0,o.Lk)("div",{class:"label-container"},[(0,o.Lk)("label",{for:"observations"},"Observations:")],-1)),(0,o.Lk)("button",{class:"collapse-button",onClick:t[6]||(t[6]=e=>g("observations")),"aria-expanded":L("observations")},(0,m.v_)(L("observations")?"-":"+"),9,Pe)]),(0,o.bF)(i.eB,{name:"fade"},{default:(0,o.k6)((()=>[L("observations")?((0,o.uX)(),(0,o.CE)("div",je,[A("observations")?(0,o.bo)(((0,o.uX)(),(0,o.CE)("textarea",{key:0,id:"observations","onUpdate:modelValue":t[7]||(t[7]=e=>u.observations=e),class:"edit-textarea"},null,512)),[[i.Jo,u.observations]]):((0,o.uX)(),(0,o.CE)("textarea",{key:1,readonly:"",value:e.animal.observations},null,8,Je)),(0,o.Lk)("button",{onClick:t[8]||(t[8]=e=>C("observations")),class:"edit-button","aria-label":"Edit Observations"},[(0,o.Lk)("i",{class:(0,m.C4)(["fas",A("observations")?"fa-check":"fa-edit"])},null,2)])])):(0,o.Q3)("",!0)])),_:1})])]),(0,o.Lk)("div",Qe,[(0,o.Lk)("div",Ke,[(0,o.Lk)("img",{src:h.value,alt:"Animal",class:(0,m.C4)(["carousel-image animate__animated",r.value])},null,10,qe),(0,o.Lk)("div",{class:"carousel-controls"},[(0,o.Lk)("button",{onClick:f,class:"carousel-button","aria-label":"Previous image"}," ❮ "),(0,o.Lk)("button",{onClick:k,class:"carousel-button","aria-label":"Next image"}," ❯ ")])]),(0,o.Lk)("div",ze,(0,m.v_)(n.value+1)+" / "+(0,m.v_)(v.value),1)])])])])):(0,o.Q3)("",!0)}};const Ye=(0,r.A)(Ge,[["__scopeId","data-v-7ff79d59"]]);var Ze=Ye,ea={components:{AddRecordModal:ve,RecordCard:Se,UpdateRecordModal:Ze},data(){return{records:[],searchQuery:"",searchField:"Selecione o Filtro",username:"",userInitials:"",showModal:!1,showUpdateModal:!1,selectedRecord:null,isSidebarClosed:!1,allRecords:[],filterType:"all"}},computed:{filteredRecords(){let e=this.records;if("today"===this.filterType){const a=(new Date).toLocaleDateString("pt-BR");e=e.filter((e=>{const t=e.modificationDate.split(" ")[0];return t===a}))}if(this.searchQuery&&"Selecione o Filtro"!==this.searchField){const a=this.searchQuery.toLowerCase();e=e.filter((e=>e[this.searchField]?.toLowerCase().includes(a)))}return e}},mounted(){this.fetchRecords()},methods:{getUserInitials(e){const a=e.split(" ");return 1===a.length?a[0][0].toUpperCase():a[0][0].toUpperCase()+a[a.length-1][0].toUpperCase()},getFirstName(e){return e.split(" ")[0]},async fetchUser(){try{const e=D.A.get("userId"),a=await y.A.get(`http://localhost:3000/user/users/${e}`),t=a.data;this.username=this.getFirstName(t.username),this.userInitials=this.getUserInitials(t.username)}catch(e){console.error("Erro ao buscar usuário:",e)}},async fetchRecords(){const e=D.A.get("userId"),a=await y.A.get(`http://localhost:3000/records/recordsByUser/${e}`);this.records=a.data},async addRecord(e){this.records.push(e),this.fetchRecords()},async removeRecord(e){await y.A.delete(`http://localhost:3000/records/deleteRecord/${e}`),this.records=this.records.filter((a=>a.id!==e))},logout(){D.A.remove("userId"),this.$router.push("/")},toggleSidebar(){this.isSidebarClosed=!this.isSidebarClosed},openUpdateRecordModal(e){e?(this.selectedRecord=e,this.showUpdateModal=!0):console.error("Record is null or undefined:",e)},formatDate(e){const a=String(e.getDate()).padStart(2,"0"),t=String(e.getMonth()+1).padStart(2,"0"),i=e.getFullYear(),o=String(e.getHours()).padStart(2,"0"),l=String(e.getMinutes()).padStart(2,"0"),s=String(e.getSeconds()).padStart(2,"0");return`${a}/${t}/${i} ${o}:${l}:${s}`},async handleUpdate(e){let{id:a,field:t,value:i}=e;try{const e=this.formatDate(new Date);await y.A.put(`http://localhost:3000/records/updateRecord/${a}`,{[t]:i,modificationDate:e});const o=this.records.findIndex((e=>e.id===a));-1!==o&&(this.records[o][t]=i,this.records[o].modificationDate=e)}catch(o){console.error("Erro ao atualizar o campo:",o)}},closeUpdateRecordModal(){this.selectedRecord=null,this.showUpdateModal=!1},filterRecords(){const e=(new Date).toLocaleDateString("pt-BR");"today"===this.filterType?this.filteredRecords=this.allRecords.filter((a=>{const t=a.modificationDate.split(" ")[0];return t===e})):this.filteredRecords=this.allRecords},setFilter(e){this.filterType=e,this.filterRecords()}},async created(){await this.fetchUser(),this.fetchRecords()}};const aa=(0,r.A)(ea,[["render",W],["__scopeId","data-v-3b65cc3d"]]);var ta=aa;const ia=[{path:"/Home",name:"Home",component:ta,beforeEnter:(e,a,t)=>{const i=D.A.get("userId");i?t():t("/")}},{path:"/",name:"Login",component:E}],oa=(0,u.aE)({history:(0,u.LA)("/"),routes:ia});var la=oa;(0,i.Ef)(c).use(la).mount("#app")}},a={};function t(i){var o=a[i];if(void 0!==o)return o.exports;var l=a[i]={exports:{}};return e[i](l,l.exports,t),l.exports}t.m=e,function(){var e=[];t.O=function(a,i,o,l){if(!i){var s=1/0;for(c=0;c<e.length;c++){i=e[c][0],o=e[c][1],l=e[c][2];for(var n=!0,r=0;r<i.length;r++)(!1&l||s>=l)&&Object.keys(t.O).every((function(e){return t.O[e](i[r])}))?i.splice(r--,1):(n=!1,l<s&&(s=l));if(n){e.splice(c--,1);var d=o();void 0!==d&&(a=d)}}return a}l=l||0;for(var c=e.length;c>0&&e[c-1][2]>l;c--)e[c]=e[c-1];e[c]=[i,o,l]}}(),function(){t.d=function(e,a){for(var i in a)t.o(a,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:a[i]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){t.p="/"}(),function(){var e={524:0};t.O.j=function(a){return 0===e[a]};var a=function(a,i){var o,l,s=i[0],n=i[1],r=i[2],d=0;if(s.some((function(a){return 0!==e[a]}))){for(o in n)t.o(n,o)&&(t.m[o]=n[o]);if(r)var c=r(t)}for(a&&a(i);d<s.length;d++)l=s[d],t.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return t.O(c)},i=self["webpackChunkfront"]=self["webpackChunkfront"]||[];i.forEach(a.bind(null,0)),i.push=a.bind(null,i.push.bind(i))}();var i=t.O(void 0,[504],(function(){return t(27)}));i=t.O(i)})();
//# sourceMappingURL=app.bca8707e.js.map