using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CharacterMovement : MonoBehaviour
{
    public GameObject playerHolder;
    public float rotateSpeed = 0.5f;

    private Quaternion q = Quaternion.identity;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void FixedUpdate()
    {
        q = Quaternion.Slerp(q, playerHolder.transform.rotation, rotateSpeed * Time.deltaTime);
        transform.rotation = q;
    }
}
