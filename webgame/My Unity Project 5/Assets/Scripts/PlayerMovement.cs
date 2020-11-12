using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{

    public float speed;
    public MyJoystick myJoystick;
    Rigidbody rb;

    public float rotateSpeed = 5f;

    Vector3 direction;
    Quaternion newRotation;

    private Animator anim;

    // Start is called before the first frame update
    void Start()
    {
        rb = GetComponent<Rigidbody>();
        newRotation = newRotation.normalized;
        anim = gameObject.GetComponentInChildren<Animator>();
    }

    // Update is called once per frame
    //void Update()
    //{

    //}

    public void FixedUpdate()
    {

        if(myJoystick.Vertical != 0 || myJoystick.Horizontal != 0 || Input.GetAxis("Vertical") != 0 || Input.GetAxis("Horizontal") != 0)
        {
            Run();
            anim.SetInteger("AnimationPar", 1);
        }
        else
        {
            anim.SetInteger("AnimationPar", 0);
        }
        Trun();
    }

    void Run()
    {

        if(myJoystick.Vertical != 0 || myJoystick.Horizontal != 0)
        {
            direction = Vector3.forward * myJoystick.Vertical + Vector3.right * myJoystick.Horizontal;
        }
        else
        {
            direction = (Vector3.forward * Input.GetAxis("Vertical") + Vector3.right * Input.GetAxis("Horizontal")).normalized;
        }
        rb.AddForce(direction * speed * Time.fixedDeltaTime, ForceMode.VelocityChange);
    }

    void Trun()
    {
        if (direction != Vector3.zero)
        {
            newRotation = Quaternion.LookRotation(direction);
        }
        rb.rotation = Quaternion.Slerp(rb.rotation, newRotation, rotateSpeed * Time.deltaTime);
    }

}
