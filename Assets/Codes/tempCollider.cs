using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class tempCollider : MonoBehaviour
{
    // Start is called before the first frame update
    private void OnTriggerEnter(Collider other)
    {
        Debug.Log("onTriggerEnter");
        other.gameObject.GetComponent<Rigidbody>().AddForce(new Vector3(40, 0, 0), ForceMode.VelocityChange);
        other.gameObject.GetComponent<PlayerMovement>().isMove = false;
    }
}
