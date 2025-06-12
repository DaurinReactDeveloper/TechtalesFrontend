export const challengeSaveDto = (title,description,idUser,hint,type) => {
    const dateCurrent = new Date().toISOString();
      return {
        Id:0,
        Title:title,
        Description: description,
        DatePublication:dateCurrent,
        type:type,
        Hint:`Pista: ${hint}`,
        IdAdmin:idUser,
        ChangeUser:idUser,
      };
    };

export const challengeDeleteDto = (id,idUser) => {
    const dateCurrent = new Date().toISOString();
      return {
        Id:id,
        Title:"",
        Description:"",
        Hint:"",
        DatePublication:dateCurrent,
        ChangeUser:idUser,
      };
    };

    export const challengeUpdateDto = (id,title,description,idUser,type,hint) => {
        const dateCurrent = new Date().toISOString();
          return {
            Id:id,
            Title:title,
            Description:description,
            DatePublication:dateCurrent,
            Type:type,
            Hint:`Pista: ${hint}`,
            ChangeUser:idUser,
          };
        };
