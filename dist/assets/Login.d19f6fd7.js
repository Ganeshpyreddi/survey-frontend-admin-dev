import{_ as m,at as d,o as _,d as u,b as s,t as f,g as l,ae as n}from"./index.7ed09931.js";var c="/assets/login.acf45f18.svg";const g={data(){return{message:"",formData:{email:"",password:""}}},methods:{handleLogin(i){if(i.preventDefault(),console.log(this.formData),!this.formData.email||!this.formData.password){this.message="Email & Password Required !";return}const e={email:this.formData.email,password:this.formData.password};d.login(e).then(a=>{a.status===200&&(sessionStorage.setItem("token",a.data.accessToken),sessionStorage.setItem("email",a.data.email),sessionStorage.setItem("userName",a.data.username),sessionStorage.setItem("userRole",a.data.userRole),sessionStorage.setItem("id",a.data.id),a.data.userRole==="superadmin"?this.$router.push({name:"admins"}):a.data.userRole==="admin"&&this.$router.push({name:"surveys"}))}).catch(a=>{console.log("error?",a),this.message=a.response.data.message})}}},p={class:"login"},h=s("div",{class:"login_left"},[s("img",{src:c,alt:"",class:"login_left_image"})],-1),D={class:"login_right"},v=s("h2",null,"Login",-1),w={class:"login_error"},S={class:"form"},I={class:"form_input_wrapper"},L=s("label",{for:"email"},"EMAIL *",-1),R={class:"form_input_wrapper"},b=s("label",{for:"password"},"PASSWORD *",-1);function k(i,e,a,x,t,r){return _(),u("div",p,[h,s("div",D,[v,s("h4",w,f(t.message),1),s("form",S,[s("div",I,[L,l(s("input",{id:"email",type:"email","onUpdate:modelValue":e[0]||(e[0]=o=>t.formData.email=o),class:"form_input"},null,512),[[n,t.formData.email]])]),s("div",R,[b,l(s("input",{id:"password",type:"password","onUpdate:modelValue":e[1]||(e[1]=o=>t.formData.password=o),class:"form_input"},null,512),[[n,t.formData.password]])]),s("button",{onClick:e[2]||(e[2]=(...o)=>r.handleLogin&&r.handleLogin(...o)),class:"login_button"},"LOGIN")])])])}var A=m(g,[["render",k]]);export{A as default};