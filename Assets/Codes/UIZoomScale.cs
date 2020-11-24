using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class UIZoomScale : MonoBehaviour
{
    public PlayerCamera playerCamera;
    private RectTransform rectTransform;

    // Start is called before the first frame update
    void Start()
    {
        rectTransform = gameObject.GetComponent<RectTransform>();
    }

    // Update is called once per frame
    void Update()
    {
        var fov = playerCamera.GetComponent<Camera>().fieldOfView;
        rectTransform.sizeDelta = new Vector2(1800, 330) * (fov * 0.01f + 0.4f);
    }
}
