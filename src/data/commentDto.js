export const commentAddDto = (Content,IdStorie,IdUser) => {
    const dateCurrent = new Date().toISOString();
      return {
        Id:0,
        Content,
        IdStorie,
        IdUser,
        DateComment:dateCurrent,
        CreationDate:dateCurrent,
        ChangeUser:IdUser,
      };
    };

    export const commentDeleteDto = (idComment,IdStorie,IdUser) => {
      const dateCurrent = new Date().toISOString();
        return {
          Id:idComment,
          Content:"",
          IdStorie,
          IdUser,
          DateComment:dateCurrent,
          ChangeUser:IdUser,
        };
      };