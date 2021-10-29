# Course Manager

## Instruções de uso

1. Clone o repositório

- `git@github.com:jdaniel-ap/course-manager.git`.
- - Entre na pasta do repositório que você acabou de clonar:
  - `cd course-manager`

2. Instale as dependências e inicialize o projeto

- `npm run config`

- Inicialize o projeto:
  e preciso criar um arquivo `.env` com as variáveis ​​de ambiente necessárias para o nosso servidor iniciar. As variáveis ​​a serem criadas são as seguintes:

  - `PORT` exemplo: 8080
  - `SECRET_KEY` exemplo: 43jh52k4b3276y7

  O sistema cria o usuário administrador inicial, então as seguintes variáveis ​​são as credenciais que desejamos que ele tenha.

  - `ADM_PASS` exemplo: 123456
  - `ADM_USERNAME` exemplo: admin
  - `ADM_EMAIL` exemplo: adm@test.com

  por último, precisamos de um banco de dados mysql

  - `DATABASE_URL` exemplo: mysql://<user>:<password>@localhost:3306/<database>?schema=public

  Depois de configurar todas as nossas variáveis ​​de ambiente rode o seguinte comando:

  - `npm run build`

  com isso o servidor cria as tabelas em nosso banco de dados, depois disso ele irá criar nosso usuário adm inicial com os dados que inserimos nas variáveis ​​de ambiente.

  para iniciar o projeto rode o comando

  - `npm run dev`
  

  A primeira visualização do aplicativo é uma página de login:
  ![image](https://user-images.githubusercontent.com/74429277/139502580-117c4e35-fa68-4423-8384-c29c58bb6aab.png)
  
  Vista da pagina de cadastro:
  ![image](https://user-images.githubusercontent.com/74429277/139502559-6b15a6b5-2176-4af1-8c49-c3ce929af94e.png)



  ### fluxo administrativo
  
  Depois de fazer login, veremos um painel com quatro opções:
  
  ![image](https://user-images.githubusercontent.com/74429277/139497620-62a96981-88ea-43b2-b399-21a74f135b72.png)


  - Modules: permite que o usuario visualize todos os módulos registrados
  - Lessons: permite que o usuario observe todas as aulas gravadas no banco
  - Users: permite a criação de um novo admin
  - Exit: retorna o usuário à tela de login

  A opção do 'Module' retorna a seguinte tela

  modulos cadastrados:
  ![image](https://user-images.githubusercontent.com/74429277/139499496-268188c9-19ce-4ea8-adc9-a5c81fdb5274.png)


  sem modulos cadastrados:
  ![image](https://user-images.githubusercontent.com/74429277/139499360-2c464a0e-ca52-4bdc-b043-7d62232a3f8e.png)


  Clicando no button "New module" retorna a seguinte tela:
  ![image](https://user-images.githubusercontent.com/74429277/139499526-4e962634-dd61-4361-9f54-4e734fa0e72f.png)


  Clicando em um modulo retorna a seguinte tela

  sem lessons:
  ![image](https://user-images.githubusercontent.com/74429277/139499298-67eb6b23-745b-4937-aa04-12cc49d43b0f.png)


  com lessons:
  ![image](https://user-images.githubusercontent.com/74429277/139502243-ad52fc45-4288-4104-84eb-bf5b3099882e.png)


  Clicando no button de "New lesson" retorna a seguinte tela:
  ![image](https://user-images.githubusercontent.com/74429277/139501862-ed57487d-4269-4227-a29f-18ec16ecb806.png)

  ### fluxo do usuario
  
  o login com um usuário não administrador retorna a seguinte tela:
  ![image](https://user-images.githubusercontent.com/74429277/139501927-4c331e4f-0a68-4907-8711-37ddc1e89b10.png)


  Clicando em um modulo retorta a seguinte tela
  
  com lessons:
  ![image](https://user-images.githubusercontent.com/74429277/139502139-c0f49328-951a-4067-b749-b700c19a6b7e.png)

  
  sem lesson:
  ![image](https://user-images.githubusercontent.com/74429277/139501982-e38da448-f749-458a-b1fa-c15ae559570b.png)


## API Documentation

<br/>

### **Sign-up**

##### `POST` /api/user/new

<br/>

O endpoint registra um novo usuário

- Example `request`

  - `body`

  ```json
  {
    "name": "Testunto Testeria",
    "email": "testerland@test.com",
    "password": "test123"
  }
  ```

  - `response`

  ```json
  {
    "status": "success",
    "message": "You have been successfully registered"
  }
  ```

  <br/>

### **Sign-up new adm** _#OnlyAdmin_

##### `POST` /api/user/new/admin

<br/>

O endpoint registra um novo usuário admin

- Example `request`

  - `headers`

  ```json
  {
    "Content-Type": "multipart/form-data",
    "Authorization": "(Sign or Login Token)"
  }
  ```

  - Example `request body`

  ```json
  {
    "name": "Testunto Testeria",
    "email": "testerland@test.com",
    "password": "test123"
  }
  ```

  - Example `response`

  ```json
  {
    "status": "success",
    "message": "New admin have been successfully registered"
  }
  ```

  <br/>

### **Login**

##### `POST` /api/user/login

  <br/>

O endpoint valida o login e retorna um token e informações básicas do usuário.

- example `request body`

  ```json
  {
    "email": "testerland@test.com",
    "password": "tester123"
  }
  ```

- example `response body`

  ```json
  {
    "name": "Testunto Testeria",
    "email": "testerland@test.com",
    "password": "test123"
  }
  ```

  - example `response body`

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ3N2IyOTlhLTIzMWYtNDBkYS05N2MzLWFjNzUyNjU0NTI2ZiIsImZ1bGxuYW1lIjoiSm9zZSBEYW5pZWwgQXJyZWF6YSBQdWVydGEiLCJ1c2VybmFtZSI6ImpkYW5pZWxfYXAiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsIm1lZGljUm9sZSI6dHJ1ZSwiaWF0IjoxNjMxNDQ2MDUxLCJleHAiOjE2MzE0NDYzNTEsInN1YiI6IjQ3N2IyOTlhLTIzMWYtNDBkYS05N2MzLWFjNzUyNjU0NTI2ZiJ9.HgKfpimfS1ExsvkXMcgNx09GAiaO1yxzI4qfrtStS_o",
    "user": {
      "id": "477b299a-231f-40da-97c3-ac752654526f",
      "username": "testex",
      "email": "testerland@test.com"
    }
  }
  ```

  <br/>

### **Get modules**

##### `GET` /api/modules/

<br/>

O endpoint retorna todos os módulos cadastrados

- Example `request`

  - `headers`

  ```json
  {
    "Content-Type": "multipart/form-data",
    "Authorization": "(Sign or Login Token)"
  }
  ```

  - `response`

  ```json
  {
    "info": [
      {
        "id": "80726858-2760-44dd-906b-587d026d5198",
        "name": "Javascript"
      },
      {
        "id": "acbdbab8-5e74-4b35-9522-ad269d76ddd3",
        "name": "Python"
      }
    ],
    "status": "success"
  }
  ```

  <br/>

### **Add modules** _#OnlyAdmin_

##### `POST` /api/modules/new

<br/>

O endpoint cadastra um novo modulo

- Example `request`

  - `headers`

  ```json
  {
    "Content-Type": "multipart/form-data",
    "Authorization": "(Sign or Login Token)"
  }
  ```

  - example `request body`

  ```json
  {
    "name": "Javascript"
  }
  ```

  - example `response body`

  ```json
  {
    "message": "Module have been successfully created",
    "status": "success"
  }
  ```

  <br/>

### **Update modules** _#OnlyAdmin_

##### `PUT` /api/modules/update

<br/>

O endpoint retorna todos os módulos cadastrados

- Example `request`

  - `headers`

  ```json
  {
    "Content-Type": "multipart/form-data",
    "Authorization": "(Sign or Login Token)"
  }
  ```

  - example `request body`

  ```json
  {
    "name": "Javascript"
  }
  ```

  - example `response body`

  ```json
  { "message": "module have been updated", "status": "success" }
  ```

  <br/>

### **Delete module** _#OnlyAdmin_

##### `DELETE` /api/modules/delete

<br/>

O endpoint deleta um modulo

- Example `request request`

  - `headers`

  ```json
  {
    "Content-Type": "multipart/form-data",
    "Authorization": "(Sign or Login Token)"
  }
  ```

  - example `request body`

  ```json
  {
    "lesson": 1
  }
  ```

  - example `response body`

  ```json
  {
    "message": "the module and associated lessons have been successfully deleted",
    "status": "success"
  }
  ```

  <br/>

### **Add lesson** _#OnlyAdmin_

##### `POST` /api/lesson/new

<br/>

O endpoint cadastra uma nova lesson

- Example `request`

  - `headers`

  ```json
  {
    "Content-Type": "multipart/form-data",
    "Authorization": "(Sign or Login Token)"
  }
  ```

  - example `body`

  ```json
    {
      "name": "Frameworks",
      "date": 2021-12-08T15:43:00,
      "moduleId": "80726858-2760-44dd-906b-587d026d5198"
    }
  ```

  - example `response body`

  ```json
  {
    "message": "lesson has been created",
    "status": "success"
  }
  ```

  <br/>

### **Get lessons**

##### `GET` /api/lesson/

<br/>

O endpoint retorna todas as lessons cadastradas

- Example `request`

  - `headers`

  ```json
  {
    "Content-Type": "multipart/form-data",
    "Authorization": "(Sign or Login Token)"
  }
  ```

  - example `response body`

  ```json
  {
    "info": [
      {
        "name": "Frameworks",
        "id": 1,
        "date": "2021-10-13T18:50:00.000Z",
        "module": {
          "name": "Javascript"
        }
      },
      {
        "name": "High order functions",
        "id": 2,
        "date": "2021-10-30T23:50:00.000Z",
        "module": {
          "name": "Javascript"
        }
      },
      {
        "name": "Jango vs Flesk",
        "id": 3,
        "date": "2021-10-22T18:00:00.000Z",
        "module": {
          "name": "Python"
        }
      }
    ],
    "status": "success"
  }
  ```

  <br/>

### **Get lessons by module id**

##### `GET` /api/lesson/:id

<br/>

O endpoint retorna todas as lessons cadastradas

- Example `request`

  - `headers`

  ```json
  {
    "Content-Type": "multipart/form-data",
    "Authorization": "(Sign or Login Token)"
  }
  ```

  - example `response body`

  ```json
  {
    "info": [
      {
        "name": "Frameworks",
        "id": 1,
        "date": "2021-10-13T18:50:00.000Z",
        "module": {
          "name": "Javascript"
        }
      },
      {
        "name": "High order functions",
        "id": 2,
        "date": "2021-10-30T23:50:00.000Z",
        "module": {
          "name": "Javascript"
        }
      }
    ],
    "status": "success"
  }
  ```

  <br/>

### **Delete lesson** _#OnlyAdmin_

##### `DELETE` /api/lesson/delete/:id

<br/>

O endpoint retorna todas as lessons cadastradas

- Example `request`

  - `headers`

  ```json
  {
    "Content-Type": "multipart/form-data",
    "Authorization": "(Sign or Login Token)"
  }
  ```

  - example `response body`

  ```json
  { "message": "lesson has been delete", "status": "success" }
  ```

  <br/>

### **Update lesson** _#OnlyAdmin_

##### `PUT` /api/lesson/update

<br/>

O endpoint cadastra uma nova lesson

- Example `request`

  - `headers`

  ```json
  {
    "Content-Type": "multipart/form-data",
    "Authorization": "(Sign or Login Token)"
  }
  ```

  - example `request body`

  ```json
    {
      "name": "Web sockets",
      "date": 2021-12-08T15:43:00,
      "moduleId": "80726858-2760-44dd-906b-587d026d5198"
    }
  ```

  - example `response body`

  ```json
  {
    "message": "lesson has been updated",
    "status": "success"
  }
  ```

  <br/>

  Os endpoints com a tag _#OnlyAdmin_ só podem ser usados ​​por um usuário com função de administrador. Ele retornará a seguinte mensagem se um usuário sem permissões de administrador tentar usá-los.

  ```json
  {
    "message": "This is an admin area, you don't have permission to access this resource",
    "status": "error"
  }
  ```
