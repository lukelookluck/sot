using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    private Animator anim;
    private Camera playerCamera;
    
    private Vector3 destination;
    private int layerMask;
    private float rotateSpeed = 10f;
    //private Vector3 knockBackForce;
    private Rigidbody rb;

    public bool isMove;
    public float moveAcc;

    private void Awake()
    {
        playerCamera = Camera.main;
        layerMask = 1 << LayerMask.NameToLayer("Ground");
        anim = gameObject.GetComponentInChildren<Animator>();
        rb = gameObject.GetComponent<Rigidbody>();
    }

    void FixedUpdate()
    {
        if (Input.GetMouseButton(1))
        {
            RaycastHit hit;
            if (Physics.Raycast(playerCamera.ScreenPointToRay(Input.mousePosition), out hit, 100f, layerMask))
            {
                SetDestination(hit.point);
            }
        }
        Move();
        Turn();
        //KnockBack();
    }

    private void SetDestination(Vector3 dest)
    {
        destination = dest;
        isMove = true;
    }

    private void Move()
    {
        if (isMove)
        {
            if (Vector3.Distance(destination, transform.position) <= Mathf.Max(rb.velocity.magnitude / 2 - 2f, 0.1f))
            {
                isMove = false;
                return;
            }

            var dir = destination - transform.position;
            //transform.position += dir.normalized * Time.deltaTime * 5f;
            if(rb.velocity.magnitude <= 10)
            {
                rb.AddForce(dir.normalized * Time.deltaTime * moveAcc, ForceMode.VelocityChange);
            }
            anim.SetInteger("AnimationPar", 1);
        }
        else
        {
            anim.SetInteger("AnimationPar", 0);
        }
    }

    private void Turn()
    {
        var dir = destination - transform.position;
        if (dir != Vector3.zero && isMove)
        {
            Quaternion newRotation = Quaternion.LookRotation(dir);
            transform.GetChild(0).rotation = Quaternion.Slerp(transform.GetChild(0).rotation, newRotation, rotateSpeed * Time.deltaTime);
        }
    }

    //private void KnockBack()
    //{

    //}
}
