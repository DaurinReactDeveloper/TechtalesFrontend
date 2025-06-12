export const challengesAddDto = (idChallenges, idUser) => {
  const dateCurrent = new Date().toISOString();
  return {
    Id: 0,
    IdUser: idUser,
    IdChallenges: idChallenges,
    DateCompleted: dateCurrent,
    CreationDate: dateCurrent,
    ChangeUser: idUser,
  };
};

export const challengesDeleteDto = (id, idUser) => {
  const dateCurrent = new Date().toISOString();
  return {
    Id: id,
    IdUser: idUser,
    IdChallenges: 0,
    DateCompleted: dateCurrent,
    CreationDate: dateCurrent,
    ChangeUser: idUser,
  };
};
