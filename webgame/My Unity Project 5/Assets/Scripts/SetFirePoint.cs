using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SetFirePoint : MonoBehaviour
{
    public float distance;
    public float height;
    public MyJoystick myJoystick;
    Vector3 direction;

    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        if (myJoystick.Vertical != 0 || myJoystick.Horizontal != 0 || Input.GetAxis("Vertical") != 0 || Input.GetAxis("Horizontal") != 0)
        {
            if (myJoystick.Vertical != 0 || myJoystick.Horizontal != 0)
            {
                direction = Vector3.forward * myJoystick.Vertical + Vector3.right * myJoystick.Horizontal;
            }
            else
            {
                direction = (Vector3.forward * Input.GetAxis("Vertical") + Vector3.right * Input.GetAxis("Horizontal")).normalized;
            }

            transform.localRotation = Quaternion.Euler(direction);
            transform.position = direction * distance + Vector3.up * height;
        }
        else
        {

        }
    }
}
