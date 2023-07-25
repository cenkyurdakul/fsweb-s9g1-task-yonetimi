import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";


import {useForm} from "react-hook-form";



const TaskForm = ({ kisiler, submitFn }) => {

  const { 
    register,
    handleSubmit,
    reset,
    formState: { errors },
    } = useForm();

  

  // yup error stateleri
  

  //const [buttonDisabled, setButtonDisabled] = useState(true);

  // form datası her güncellendiğinde valid mi diye kontrol et
  //useEffect(() => {
  //  formSemasi.isValid(formData).then((valid) => setButtonDisabled(!valid));
  //}, [formData]);

  
  // task ekleme
  function myCustomHandleSubmit(data) {
    console.log(data)
    submitFn({
      ...data,
     id: nanoid(5),
    status: "yapılacak",
    });
    reset()
    //setFormData({
     //title: "",
      //description: "",
     // people: [],
    //});
  }

  /* <input
        {...register("mail", { required: "Email Address is required" })}
        aria-invalid={errors.mail ? "true" : "false"}
      />
      {errors.mail && <p role="alert">{errors.mail?.message}</p>} */

  return (
    <form className="taskForm" onSubmit={handleSubmit(myCustomHandleSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          {...register("title", {
            required: "Task başlığı yazmalısınız",
            minLength:{
            value: 3,
            message: "Task başlığı en az 3 karakter olmalı"
          } } )}
          type="text"
         
        />
        {errors.title && (
        <p className="input-error">{errors.title?.message}</p>
        )}
        
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength:{
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı"
          }})}
          
        ></textarea>
        
        {errors.description && (
        <p className="input-error">{errors.description?.message}</p>
        )}

      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                {...register("people", {
                  required: "Lütfen en az bir kişi seçin",
                  validate: (peoList)=> 
                  peoList.length <= 3 || "En fazla 3 kişi seçebilirsiniz",
                })}
                value={p}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && (
        <p className="input-error">{errors.people?.message}</p>
        )}
        
      </div>

      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          // disabled={buttonDisabled}
        >
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
