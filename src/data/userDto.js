export const userAddDto = (ImgProfile, Name, Email, PasswordHash,) => {
  const dateCurrent = new Date().toISOString();
    return {
      Id:0,
      ImgProfile,
      Name,
      Email,
      DateRegister:dateCurrent,
      PasswordHash,
      Role:"usuario",
      CreationDate:dateCurrent
    };
  };

  export const userUpdateDto = (id, Name, Email, PasswordHash,idUser) => {
    const dateCurrent = new Date().toISOString();
      return {
        Id:id,
        ImgProfile:"",
        Name,
        Email,
        DateRegister:dateCurrent,
        PasswordHash,
        Role:"",
        ChangeUser:idUser
      };
    };


  export const userDeleteDto = (id,idUser) => {
    const dateCurrent = new Date().toISOString();
      return {
        Id:id,
        ImgProfile:"",
        Name:"",
        Email:"",
        DateRegister:dateCurrent,
        PasswordHash:"",
        Role:"",
        CreationDate:dateCurrent,
        ChangeUser:idUser
      };
    };