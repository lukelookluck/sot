using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Respawn : MonoBehaviour
{
    private Vector3 pos;
    private Quaternion rot;

    // Start is called before the first frame update
    void Start()
    {
        pos = transform.position;
        rot = transform.rotation;
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void OnCollisionEnter(Collision co)
    {
        if (co.gameObject.tag == "Respawn")
        {
            transform.position = pos;
            transform.rotation = rot;
            GetComponentInChildren<Rigidbody>().velocity = Vector3.zero;
        }
    }
}
