import FIREBASE from "../config/FIREBASE";
import { dispatchError, dispatchLoading, dispatchSuccess } from "../utils";

export const GET_LIST_LIGA = "GET_LIST_LIGA";
export const TAMBAH_LIGA = "TAMBAH_LIGA";
export const GET_DETAIL_LIGA = "GET_DETAIL_LIGA";

export const getListLiga = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_LIST_LIGA);

    FIREBASE.database()
      .ref("ligas")
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val() ? querySnapshot.val() : [];
        let dataItem = { ...data };

        dispatchSuccess(dispatch, GET_LIST_LIGA, dataItem);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_LIST_LIGA, error);
        alert(error);
      });
  };
};

export const getDetailLiga = (id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_LIGA);

    FIREBASE.database()
      .ref("ligas/" + id)
      .once("value", (querySnapshot) => {
        //Hasil
        let data = querySnapshot.val() ? querySnapshot.val() : [];
        let dataItem = { ...data };

        dispatchSuccess(dispatch, GET_DETAIL_LIGA, dataItem);
      })
      .catch((error) => {
        dispatchError(dispatch, GET_DETAIL_LIGA, error);
        alert(error);
      });
  };
};

export const tambahLiga = (data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, TAMBAH_LIGA);

    //upload ke storage firebase
    var uploadTask = FIREBASE.storage()
      .ref("ligas")
      .child(data.imageToDB.name)
      .put(data.imageToDB);

    //proses upload
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot); //proses upload, we can pause or continue the uploading here
      },
      (error) => {
        console.log(error);
      },
      () => {
        //what we do if succeed
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const dataBaru = {
            namaLiga: data.namaLiga,
            image: downloadURL,
          };

          FIREBASE.database()
            .ref("ligas")
            .push(dataBaru)
            .then((response) => {
              dispatchSuccess(dispatch, TAMBAH_LIGA, response ? response : []);
            })
            .catch((error) => {
              dispatchError(dispatch, TAMBAH_LIGA, error);
              alert(error);
            });
        });
      }
    );
  };
};
