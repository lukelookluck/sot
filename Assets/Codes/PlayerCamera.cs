using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerCamera : MonoBehaviour
{
    public float zoomIn = 5f;
    public float ZoomOut = 20f;
    public float distance;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        float scroll = Input.GetAxis("Mouse ScrollWheel") * 1000f * Time.deltaTime;

        if (distance <= zoomIn && scroll > 0)
        {
            distance = zoomIn;
        }
        else if (distance >= ZoomOut && scroll < 0)
        {
            distance = ZoomOut;
        }
        else
        {
            distance -= scroll;
        }


        this.transform.position = GetComponentInParent<PlayerMovement>().transform.position + distance * new Vector3(0, Mathf.Sqrt(3), -1) / 2 + new Vector3(0, 0, 0.6f);
        this.transform.rotation = Quaternion.Euler(new Vector3(60, 0, 0));
    }
}
