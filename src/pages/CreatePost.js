import React, { useState, useEffect } from "react";
import "./../components/Forms/Forms.css"
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { Progress, Form, Upload, Button, Input, Radio, RadioChangeEvent } from "antd";
import Image from "../images/back_icon.png"
import { useAuthState } from "react-firebase-hooks/auth";

function CreatePost({ isAuth }) {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();


  const [form] = Form.useForm();
  const [user, error] = useAuthState(auth);



  useEffect(() => {
    !user && navigate("/")
  }, [user]);

  const [formData, setFormData] = useState({
    pdf: "",
  });
  const [levels, setLevel] = useState('');


  const [progress, setProgress] = useState(0);

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };


  const handleImageChange = (e) => {
    setFormData({ ...formData, pdf: e.file });
    console.log(e.file)
  };



  const handlePublish = (value) => {
    console.log('courseCode: ' + value.CourseCode, 'levels: ' + levels, formData.pdf)
    if (!value.CourseCode || !levels || !formData.pdf) {
      alert("Please fill all the fields");
      return;
    }
    setLoading(true)
    const storageRef = ref(
      storage,
      `/pdf/${Date.now()}${formData.pdf.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, formData.pdf);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setLoading(false)

        setFormData({
          pdf: "",
        });

        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const postsCollectionRef = collection(db, "posts");
          addDoc(postsCollectionRef, {
            courseCode: value.CourseCode,
            level: levels,
            pdf: url,

          })
            .then(() => {
              navigate("/");
              console.log(postsCollectionRef)
            })
            .catch((err) => {
              // toast("Error adding article", { type: "error" });
            });
        });
      }
    );
  };



  return (
    <div className="createPostPage">

      <div className="cpContainer">
        <button className="back"
          onClick={() => navigate('/admin')}>
          <img src={Image} alt="" /> <p>Back</p> </button>

        <h1 className="add_book">Add a book</h1>


        <Form
          form={form}
          name="register"
          onFinish={handlePublish}
        >

          <Form.Item
            name="CourseCode"
            label="Course Code"
            rules={[
              {
                required: true,
                message: 'Please enter Course Code!',
              },
            ]}

          >
            <Input
              placeholder="Enter Course Code"
              name="CourseTitle"
              type="text"
              rules={[
                {
                  required: true,
                  message: 'Please enter Course Code!',
                },
              ]} />
          </Form.Item>

          <Form.Item
            name='level'
          >
            <Radio.Group
              className="radio_button"
              onChange={(e: RadioChangeEvent) => {
                setLevel(e.target.value)
                console.log(e.target.value)
              }}
              value={levels}
            >
              <Radio value="100l" >100L</Radio>
              <Radio value="200l" >200L</Radio>
              <Radio value="300l" >300L</Radio>
              <Radio value="400l" >400L</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Upload onChange={handleImageChange}
              maxCount={1}
              listType="picture"
              beforeUpload={() => false}
            // className="avatar-uploader"
            >
              <Button>Select Pdf</Button>
            </Upload>

            {progress > 0 && `${progress}%`}
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              htmlType="submit"
              className="btn search_btn mt-2"
              type="primary"
            >
              Add book
            </Button>
          </Form.Item >
        </Form>


        {progress === 0 ? null : (
          <Progress percent={progress} />
        )}




      </div>
    </div>
  );
}

export default CreatePost;