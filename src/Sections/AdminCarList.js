import React, {useEffect} from 'react';
import {
  BigContainer,
  ListContainer,
  Pwd,
  Category,
  CategoryContainer,
  InfoContainer,
  ListItem,
  Buttons,
  Button,
  Container,
  DeleteContainer,
  DeleteInfo,
  Overlay,
  ButtonContainer,
  DeleteButton,
  BigContainerLoading,
  NotFoundContainer,
  ContentContainer,
} from '../Styles/AdminCarList';
import carTemp from '../Assets/carTemp.png';
import {BsPeople, BsClock} from 'react-icons/bs';
import {FiTrash, FiEdit} from 'react-icons/fi';
import {BsPlusLg} from 'react-icons/bs';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import deleteImage from '../Assets/DeletePopUp.png';
import Popup from '../Components/PopupMessage';
import {carManipulation} from '../Redux/Actions/CarAction';
import DotLoader from 'react-spinners/DotLoader';
import {SmallContainer} from '../Styles/CarList';
import NotFoundImage from '../Assets/NotFoundGray.jpg';
import useState from 'react-usestateref';
import {AiOutlineDoubleLeft, AiOutlineDoubleRight} from 'react-icons/ai';
import {PageItem} from '../Styles/Dashboard';

export default function AdminCarList() {
  let bulan = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dec',
  ];
  let manipulation = useSelector((state) => state.items.listMessage);
  let [active, setActive, activeRef] = useState([true, false, false, false]);
  let [value] = useSearchParams();
  let [isDelete, setIsDelete] = useState(false);
  let [deleteId, setDeleteId] = useState(0);
  let [deleteSuccess, setDeleteSuccess] = useState(false);
  let [errorMessage, setErrorMessage] = useState('');
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [loading, setLoading] = useState(true);
  let [isLoading, setIsLoading] = useState(true);
  let [, setCutData, cutDataRef] = useState();
  let [, setPosisi, posisiRef] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      dispatch(carManipulation(false));
    }, 2000);
  }, [dispatch]);

  let toEdit = (data) => {
    navigate(`/admin/list/edit/${data}`);
  };

  let deleteData = async () => {
    try {
      let rawData = await window.fetch(
        `https://bootcamp-rent-car.herokuapp.com/admin/car/${deleteId}`,
        {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
          },
        }
      );

      let data = await rawData.json();

      if (rawData.status !== 200) {
        throw new Error(data.message ? data.message : data.errors[0].message);
      }
      setIsDelete(false);
      setDeleteSuccess(true);

      setTimeout(() => {
        setDeleteSuccess(false);
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  let getDeleteData = (id) => {
    setIsDelete(true);
    setDeleteId(id);
  };

  useEffect(() => {
    let getData = async () => {
      try {
        let rawData = await window.fetch(
          'https://bootcamp-rent-car.herokuapp.com/admin/car'
        );

        let data = await rawData.json();

        if (rawData.status !== 200) {
          throw new Error(data.message ? data.message : data.errors[0].message);
        }

        if (activeRef.current[1]) {
          data = data.filter((item) => item.category === '2 - 4 orang');
        } else if (activeRef.current[2]) {
          data = data.filter((item) => item.category === '4 - 6 orang');
        } else if (activeRef.current[3]) {
          data = data.filter((item) => item.category === '6 - 8 orang');
        }

        if (value.get('search')) {
          data = data.filter((item) =>
            item.name
              ?.toLowerCase()
              ?.includes(value.get('search')?.toLowerCase())
          );
        }

        let cut = [];
        for (let i = 0; i < data.length; i += 8) {
          cut.push(data.slice(i, i + 8));
        }
        setCutData(cut);

        if (cutDataRef.current) {
          setLoading(false);
        }

        setLoading(false);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    if (value.get('search') === false) {
      getData();
    } else {
      let delay = setTimeout(() => {
        getData();
      }, 500);

      return () => clearTimeout(delay);
    }
  }, [active, isDelete, activeRef, value, cutDataRef, setCutData]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, [loading]);

  if (loading === false) {
    return (
      <BigContainer>
        {errorMessage ? <Popup text={errorMessage}></Popup> : null}
        {deleteSuccess ? <Popup text="Data Berhasil Dihapus"></Popup> : null}
        {manipulation ? (
          <Popup text="Data Berhasil Disimpan" color></Popup>
        ) : null}
        <Pwd>
          Cars {`>`} <span>List Car</span>
        </Pwd>
        <Container>
          <h2>List Car</h2>
          <Link to="/admin/list/add">
            <button>
              <BsPlusLg className="icon"></BsPlusLg>Add New Car
            </button>
          </Link>
        </Container>
        <CategoryContainer>
          <Category
            className={activeRef.current[0] ? 'active' : null}
            onClick={() =>
              setActive([!activeRef.current[0], false, false, false])
            }
          >
            <h3>All</h3>
          </Category>
          <Category
            className={activeRef.current[1] ? 'active' : null}
            onClick={() =>
              setActive([false, !activeRef.current[1], false, false])
            }
          >
            <h3>2 - 4 People</h3>
          </Category>
          <Category
            className={activeRef.current[2] ? 'active' : null}
            onClick={() =>
              setActive([false, false, !activeRef.current[2], false])
            }
          >
            <h3>4 - 6 People</h3>
          </Category>
          <Category
            className={activeRef.current[3] ? 'active' : null}
            onClick={() =>
              setActive([false, false, false, !activeRef.current[3]])
            }
          >
            <h3>6 - 8 People</h3>
          </Category>
        </CategoryContainer>
        {cutDataRef.current[posisiRef.current] !== 0 ? (
          <ContentContainer>
            <ListContainer>
              {cutDataRef.current[posisiRef.current]?.map((item, idx) => {
                let tanggal = item.updatedAt.split('T');
                let [year, month, day] = tanggal[0].split('-');
                let time = tanggal[1].slice(0, 5);
                return (
                  <ListItem key={idx}>
                    <img src={item.image ? item.image : carTemp} alt="car" />
                    <p>{item.name}</p>
                    <h3>Rp {item.price} / hari</h3>
                    <InfoContainer>
                      <BsPeople className="icon"></BsPeople>
                      <p>{item.category}</p>
                    </InfoContainer>
                    <InfoContainer>
                      <BsClock className="icon"></BsClock>
                      <p>
                        Updated at {day} {bulan[+month]} {year}, {time}
                      </p>
                    </InfoContainer>
                    <Buttons>
                      <Button onClick={() => getDeleteData(item.id)}>
                        <FiTrash className="icon"></FiTrash>Delete
                      </Button>
                      <Button onClick={() => toEdit(item.id)}>
                        <FiEdit className="icon"></FiEdit>Edit
                      </Button>
                    </Buttons>
                  </ListItem>
                );
              })}
            </ListContainer>
            {cutDataRef.current[posisiRef.current] ? (
              <PageItem>
                <div
                  onClick={() => {
                    if (posisiRef.current > 0) {
                      setPosisi(posisiRef.current - 1);
                    } else {
                      setPosisi(cutDataRef.current.length - 1);
                    }
                  }}
                >
                  <AiOutlineDoubleLeft></AiOutlineDoubleLeft>
                </div>
                {[...Array(5).fill(10)].map((item, idx) => {
                  let awal = 0;
                  awal = posisiRef.current - (posisiRef.current % 5);
                  if (idx + awal <= cutDataRef.current.length - 1) {
                    if (idx + awal === posisiRef.current) {
                      return (
                        <div
                          className="active"
                          onClick={() => setPosisi(idx + awal - 1)}
                          key={idx + awal}
                        >
                          {idx + awal + 1}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          onClick={() => setPosisi(idx + awal - 1)}
                          key={idx + awal}
                        >
                          {idx + awal + 1}
                        </div>
                      );
                    }
                  }
                  return null;
                })}
                <div
                  onClick={() => {
                    if (posisiRef.current < cutDataRef.current.length - 1) {
                      setPosisi(posisiRef.current + 1);
                    } else {
                      setPosisi(0);
                    }
                  }}
                >
                  <AiOutlineDoubleRight></AiOutlineDoubleRight>
                </div>
              </PageItem>
            ) : null}
          </ContentContainer>
        ) : (
          <NotFoundContainer>
            <img src={NotFoundImage} alt="Not Found" />
            <h1 className="errorh1">Waduh mobil yang anda cari nga ada!!</h1>
            <p className="errorp">
              Pastikan jaringan internet anda berjalan dengan baik...
            </p>
          </NotFoundContainer>
        )}
        {isDelete ? (
          <Overlay>
            <DeleteContainer>
              <img src={deleteImage} alt="car" />
              <DeleteInfo>
                <h3>Menghapus Data Mobil</h3>
                <p>
                  Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin
                  ingin menghapus?
                </p>
              </DeleteInfo>
              <ButtonContainer>
                <DeleteButton onClick={deleteData}>Ya</DeleteButton>
                <DeleteButton onClick={() => setIsDelete(false)}>
                  Tidak
                </DeleteButton>
              </ButtonContainer>
            </DeleteContainer>
          </Overlay>
        ) : null}
      </BigContainer>
    );
  } else {
    if (isLoading === true) {
      return (
        <BigContainerLoading>
          <DotLoader color={'#D0d0d0'} size={100} className="load" />
        </BigContainerLoading>
      );
    } else {
      return (
        <SmallContainer className="loadContainer carList height">
          <img src={NotFoundImage} alt="Not Found" />
          <h1 className="errorh1">Waduh mobil yang anda cari nga ada!!</h1>
          <p className="errorp">
            Pastikan jaringan internet anda berjalan dengan baik...
          </p>
        </SmallContainer>
      );
    }
  }
}
