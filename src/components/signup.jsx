import React, { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./error";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const Signup = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilepic: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const { data, error, loading, fn: fnSignup } = useFetch(signup, formData);

  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [error, loading]);

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid Email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is Required"),
        profilepic: Yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle> SignUp</CardTitle>
          <CardDescription>
            Create a new account if you haven&rsquo;t already
          </CardDescription>
          <div> {errors && <Error message={errors.message} />}</div>
        </CardHeader>

        <CardContent className="space-y-4 ">
          <div className="space-y-1 ">
            <Input
             
              type="name"
              name="name"
              placeholder="Enter Name"
              onChange={handleInputChange}
            />
            {errors.name && <Error message={errors.name} />}
          </div>

          <div className="space-y-1 ">
            <Input
             
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleInputChange}
            />
            {errors.email && <Error message={errors.email} />}
          </div>

          <div className="space-y-1">
            <Input
              className="w-full"
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={handleInputChange}
            />
            {errors.password && <Error message={errors.password} />}
          </div>

          <div className="space-y-1">
            <Input
              type="file"
              name="profilepic"
              accept="image/*"
              onChange={handleInputChange}
            />
            {errors.profilepic && <Error message={errors.profilepic} />}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignup}>
            {loading ? (
              <BeatLoader size={10} color="#36d7b7" />
            ) : (
              "Create Account"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
