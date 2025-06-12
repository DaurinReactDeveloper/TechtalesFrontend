export const storieAddDto = (title,content,idUser) => {
  const dateCurrent = new Date().toISOString();
      return {
        Id:0,
        Title:title,
        Content:content,
        DatePublication:dateCurrent,
        IdUser: idUser,
        CreationDate:dateCurrent,
        ChangeUser:idUser,
      };
    };

export const storieRemoveDto = (idStorie,IdUser) => {
  const dateCurrent = new Date().toISOString();
      return {
        Id:idStorie,
        Title:"",
        Content:"",
        DatePublication:dateCurrent,
        IdUser,
        ChangeUser:IdUser,
      };
    };

export const storieUpdateDto = (idStorie,title,content,idUser) => {
  const dateCurrent = new Date().toISOString();
      return {
        Id:idStorie,
        Title:title,
        Content:content,
        DatePublication:dateCurrent,
        IdUser: idUser,
        ChangeUser:idUser,
      };
    };