using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FollowingCamera : MonoBehaviour
{

    public Transform player;
    public float smooth = 0f;

    private Vector3 cameraOffset = Vector3.zero;
    private Vector3 velocity = Vector3.zero;

    // Start is called before the first frame update
    void Start()
    {
        cameraOffset = transform.position;
    }

    // Update is called once per frame
    void Update()
    {
        Vector3 cameraPosition = cameraOffset + player.position;
        transform.position = Vector3.SmoothDamp(transform.position, cameraPosition, ref velocity, smooth);
    }
}
