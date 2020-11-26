using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    private Animator anim;
    private Camera playerCamera;
    
    private int layerMask;
    private float rotateSpeed = 10f;
    private Rigidbody rb;


    private Vector3 destination;
    private bool sDown;

    [SerializeField]
    private GameObject playerCharacter;

    public bool isStun;
    public bool isDestination;
    public bool isMove;
    public float moveAcc;

    public enum State
    {
        Idle, Casting, Freeze, Dead
    }
    public State state = State.Idle;


    private void Awake()
    {
        playerCamera = Camera.main;
        layerMask = 1 << LayerMask.NameToLayer("Ground");
        anim = gameObject.GetComponentInChildren<Animator>();
        rb = gameObject.GetComponent<Rigidbody>();
    }

    void Update()
    {
        if (state == State.Idle)
        {
            // Movement
            GetInput();
            Move();
            Turn();
            // Able to Casting
        }
        else if (state == State.Casting)
        {
            // No Movement
            // Memorize last command
        }
        else if (state == State.Freeze)
        {
            // No Movement
            // Memorize last command
        }
        else if (state == State.Dead)
        {

        }
    }

    private void GetInput()
    {
        sDown = Input.GetKeyDown("s");

        if (Input.GetMouseButton(1))
        {
            RaycastHit hit;
            if (Physics.Raycast(playerCamera.ScreenPointToRay(Input.mousePosition), out hit, 100f, layerMask))
            {
                destination = hit.point;
                isDestination = true;
            }
        }
    }

    private void Move()
    {
        if (sDown)
        {
            isDestination = false;
        }
        if (isStun)
        {
            isMove = false;
        }
        else
        {
            isMove = isDestination;
        }

        anim.SetBool("isRun", isMove);

        if (isMove)
        {
            // Stop and reset destination
            if (Vector3.Distance(destination, transform.position) <= Mathf.Max(rb.velocity.magnitude / 2 - 2f, 0.1f))
            {
                isDestination = false;
                return;
            }

            // Find direction and AddForce
            var dir = destination - transform.position;
            if (rb.velocity.magnitude <= 10)
            {
                rb.AddForce(dir.normalized * Time.deltaTime * moveAcc, ForceMode.VelocityChange);
            }
        }
    }

    private void Turn()
    {
        var dir = destination - transform.position;
        if (dir != Vector3.zero && isMove)
        {
            Quaternion newRotation = Quaternion.LookRotation(dir);
            playerCharacter.transform.rotation = Quaternion.Slerp(playerCharacter.transform.rotation, newRotation, rotateSpeed * Time.deltaTime);
        }
    }

}
