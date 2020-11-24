using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerCamera : MonoBehaviour
{
    private Camera playerCamera;

    void Start()
    {
        playerCamera = gameObject.GetComponent<Camera>();
    }

    // Update is called once per frame
    void Update()
    {
        Zoom();
    }

    public void Zoom()
    {
        var scroll = Input.mouseScrollDelta;
        playerCamera.fieldOfView = Mathf.Clamp(playerCamera.fieldOfView - scroll.y * 3f, 10f, 60f);
    }
}

